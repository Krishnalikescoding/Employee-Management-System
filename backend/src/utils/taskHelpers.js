import pool from '../config/db.js'

export const TASK_TAGS = [
  'pickup',
  'servicing',
  'hardware_issue',
  'software_issue',
  'other',
]

export const TASK_STATUSES = ['todo', 'in_progress', 'review', 'completed', 'failed']
export const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent']
export const MAX_DESCRIPTION_LENGTH = 2000

export const generateTaskCode = (id) => `TASK-${String(id).padStart(4, '0')}`

export const formatTask = (row, attachments = []) => ({
  id: row.id,
  taskCode: row.task_code,
  title: row.title,
  description: row.description,
  dueDate: row.due_date,
  dueTime: row.due_time,
  estimatedCompletion: row.estimated_completion,
  category: row.category,
  priority: row.priority,
  status: row.status,
  tag: row.tag,
  customTag: row.custom_tag,
  displayTag: row.tag === 'other' && row.custom_tag ? row.custom_tag : row.tag?.replace(/_/g, ' '),
  employeeId: row.employee_id,
  employeeName: row.employee_name,
  assignedById: row.assigned_by_id,
  completedAt: row.completed_at,
  failedAt: row.failed_at,
  remindAt: row.remind_at,
  attachments,
  isOverdue: row.is_overdue === 1,
})

const taskSelect = `
  t.id, t.task_code, t.employee_id, t.assigned_by_id, t.title, t.description,
  t.due_date, t.due_time, t.estimated_completion, t.category, t.priority, t.status,
  t.tag, t.custom_tag, t.remind_at, t.completed_at, t.failed_at,
  u.first_name AS employee_name,
  (t.status NOT IN ('completed', 'failed')
    AND TIMESTAMP(t.due_date, COALESCE(t.due_time, '23:59:59')) < NOW()) AS is_overdue
`

export const markOverdueTasksFailed = async () => {
  await pool.query(`
    UPDATE tasks
    SET status = 'failed', failed_at = NOW(), updated_at = NOW()
    WHERE status NOT IN ('completed', 'failed')
      AND TIMESTAMP(due_date, COALESCE(due_time, '23:59:59')) < NOW()
  `)
}

export const getTaskAttachments = async (taskIds) => {
  if (!taskIds.length) return {}

  const [rows] = await pool.query(
    'SELECT id, task_id, file_name, file_path, file_url, file_type FROM task_attachments WHERE task_id IN (?)',
    [taskIds]
  )

  return rows.reduce((acc, file) => {
    if (!acc[file.task_id]) acc[file.task_id] = []
    acc[file.task_id].push({
      id: file.id,
      fileName: file.file_name,
      filePath: file.file_path,
      fileUrl: file.file_url,
      fileType: file.file_type,
    })
    return acc
  }, {})
}

export const fetchTasksWithAttachments = async (query, params) => {
  const [rows] = await pool.query(query, params)
  const attachmentMap = await getTaskAttachments(rows.map((r) => r.id))
  return rows.map((row) => formatTask(row, attachmentMap[row.id] || []))
}

export const validateTaskInput = (body) => {
  const errors = []

  if (!body.title?.trim()) errors.push('Title is required')
  if (body.title?.trim().length > 255) errors.push('Title is too long')
  if (!body.description?.trim()) errors.push('Description is required')
  if (body.description?.trim().length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description must be under ${MAX_DESCRIPTION_LENGTH} characters`)
  }
  if (!body.dueDate) errors.push('Due date is required')
  if (!body.employeeId) errors.push('Please assign an employee')
  if (!body.priority || !TASK_PRIORITIES.includes(body.priority)) {
    errors.push('Valid priority is required')
  }
  if (!body.status || !TASK_STATUSES.includes(body.status)) {
    errors.push('Valid status is required')
  }
  if (!body.tag || !TASK_TAGS.includes(body.tag)) {
    errors.push('Valid tag is required')
  }
  if (body.tag === 'other' && !body.customTag?.trim()) {
    errors.push('Custom tag is required when "Other" is selected')
  }

  if (body.dueDate) {
    const due = new Date(`${body.dueDate}T${body.dueTime || '23:59:59'}`)
    if (due < new Date()) errors.push('Due date and time cannot be in the past')
  }

  return errors
}

export const getCategoryFromTag = (tag, customTag) => {
  if (tag === 'other' && customTag?.trim()) return customTag.trim()
  const labels = {
    pickup: 'Pickup',
    servicing: 'Servicing',
    hardware_issue: 'Hardware Issue',
    software_issue: 'Software Issue',
    other: 'Other',
  }
  return labels[tag] || 'General'
}

export const buildRemindAt = (dueDate, dueTime) => {
  const due = new Date(`${dueDate}T${dueTime || '09:00:00'}`)
  const remind = new Date(due.getTime() - 24 * 60 * 60 * 1000)
  return remind > new Date() ? remind : null
}

export { taskSelect }
