import pool from '../config/db.js'
import {
  buildRemindAt,
  fetchTasksWithAttachments,
  formatTask,
  generateTaskCode,
  getCategoryFromTag,
  markOverdueTasksFailed,
  taskSelect,
  validateTaskInput,
} from '../utils/taskHelpers.js'

const parseBody = (req) => ({
  title: req.body.title,
  description: req.body.description,
  dueDate: req.body.dueDate,
  dueTime: req.body.dueTime || null,
  estimatedCompletion: req.body.estimatedCompletion || null,
  priority: req.body.priority,
  status: req.body.status || 'todo',
  tag: req.body.tag,
  customTag: req.body.customTag || null,
  employeeId: Number(req.body.employeeId),
  linkUrl: req.body.linkUrl || null,
})

export const getMyTasks = async (req, res) => {
  try {
    await markOverdueTasksFailed()
    const tasks = await fetchTasksWithAttachments(
      `SELECT ${taskSelect} FROM tasks t
       JOIN users u ON u.id = t.employee_id
       WHERE t.employee_id = ?
       ORDER BY t.due_date ASC, t.due_time ASC`,
      [req.user.id]
    )
    return res.json({ tasks })
  } catch (error) {
    console.error('Get my tasks error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const getAllTasks = async (req, res) => {
  try {
    await markOverdueTasksFailed()
    const tasks = await fetchTasksWithAttachments(
      `SELECT ${taskSelect} FROM tasks t
       JOIN users u ON u.id = t.employee_id
       ORDER BY t.created_at DESC`,
      []
    )
    return res.json({ tasks })
  } catch (error) {
    console.error('Get all tasks error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const createTask = async (req, res) => {
  const body = parseBody(req)
  const errors = validateTaskInput(body)

  if (errors.length) {
    return res.status(400).json({ message: errors[0], errors })
  }

  try {
    const [employees] = await pool.query(
      'SELECT id, first_name FROM users WHERE id = ? AND role = ? AND is_active = 1 LIMIT 1',
      [body.employeeId, 'employee']
    )

    if (employees.length === 0) {
      return res.status(400).json({ message: 'Invalid employee selected' })
    }

    const remindAt = buildRemindAt(body.dueDate, body.dueTime)
    const placeholderCode = `TASK-PENDING`
    const category = getCategoryFromTag(body.tag, body.customTag)

    const [result] = await pool.query(
      `INSERT INTO tasks (
        task_code, employee_id, assigned_by_id, title, description,
        due_date, due_time, estimated_completion, category, priority, status,
        tag, custom_tag, remind_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        placeholderCode,
        body.employeeId,
        req.user.id,
        body.title.trim(),
        body.description.trim(),
        body.dueDate,
        body.dueTime,
        body.estimatedCompletion?.trim() || null,
        category,
        body.priority,
        body.status,
        body.tag,
        body.tag === 'other' ? body.customTag?.trim() : null,
        remindAt,
      ]
    )

    const taskCode = generateTaskCode(result.insertId)
    await pool.query('UPDATE tasks SET task_code = ? WHERE id = ?', [taskCode, result.insertId])

    const files = req.files || []
    for (const file of files) {
      await pool.query(
        'INSERT INTO task_attachments (task_id, file_name, file_path, file_type) VALUES (?, ?, ?, ?)',
        [result.insertId, file.originalname, `/uploads/${file.filename}`, file.mimetype]
      )
    }

    if (body.linkUrl?.trim()) {
      await pool.query(
        'INSERT INTO task_attachments (task_id, file_name, file_url, file_type) VALUES (?, ?, ?, ?)',
        [result.insertId, 'External link', body.linkUrl.trim(), 'link']
      )
    }

    const employee = employees[0]
    await pool.query(
      'INSERT INTO task_notifications (user_id, task_id, message) VALUES (?, ?, ?)',
      [
        body.employeeId,
        result.insertId,
        `New task ${taskCode} assigned: "${body.title.trim()}" (due ${body.dueDate})`,
      ]
    )

    const tasks = await fetchTasksWithAttachments(
      `SELECT ${taskSelect} FROM tasks t
       JOIN users u ON u.id = t.employee_id WHERE t.id = ?`,
      [result.insertId]
    )

    return res.status(201).json({ task: tasks[0] })
  } catch (error) {
    console.error('Create task error:', error)
    return res.status(500).json({ message: error.message || 'Server error' })
  }
}

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params
  const { action } = req.body

  if (!['completed', 'failed'].includes(action)) {
    return res.status(400).json({ message: 'Action must be completed or failed' })
  }

  try {
    await markOverdueTasksFailed()

    const [rows] = await pool.query(
      'SELECT id, employee_id, status, task_code FROM tasks WHERE id = ? LIMIT 1',
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' })
    }

    const task = rows[0]

    if (task.employee_id !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to update this task' })
    }

    if (['completed', 'failed'].includes(task.status)) {
      return res.status(400).json({ message: 'Task is already closed' })
    }

    const newStatus = action
    const completedAt = action === 'completed' ? new Date() : null
    const failedAt = action === 'failed' ? new Date() : null

    await pool.query(
      `UPDATE tasks SET status = ?, completed_at = ?, failed_at = ?, updated_at = NOW() WHERE id = ?`,
      [newStatus, completedAt, failedAt, id]
    )

    const tasks = await fetchTasksWithAttachments(
      `SELECT ${taskSelect} FROM tasks t
       JOIN users u ON u.id = t.employee_id WHERE t.id = ?`,
      [id]
    )

    return res.json({ task: tasks[0] })
  } catch (error) {
    console.error('Update task status error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
