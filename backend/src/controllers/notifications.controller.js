import pool from '../config/db.js'

export const getNotifications = async (req, res) => {
  try {
    const [stored] = await pool.query(
      `SELECT n.id, n.message, n.is_read AS isRead, n.created_at AS createdAt,
              t.task_code AS taskCode, t.title AS taskTitle, 'stored' AS type
       FROM task_notifications n
       JOIN tasks t ON t.id = n.task_id
       WHERE n.user_id = ?
       ORDER BY n.created_at DESC
       LIMIT 15`,
      [req.user.id]
    )

    const [dueSoon] = await pool.query(
      `SELECT CONCAT('due-', t.id) AS id,
              CONCAT('Reminder: ', t.task_code, ' is due within 24 hours') AS message,
              0 AS isRead, NOW() AS createdAt, t.task_code AS taskCode, t.title AS taskTitle, 'reminder' AS type
       FROM tasks t
       WHERE t.employee_id = ?
         AND t.status NOT IN ('completed', 'failed')
         AND t.remind_at IS NOT NULL
         AND t.remind_at <= NOW()
         AND TIMESTAMP(t.due_date, COALESCE(t.due_time, '23:59:59')) > NOW()`,
      [req.user.id]
    )

    const [overdue] = await pool.query(
      `SELECT CONCAT('overdue-', t.id) AS id,
              CONCAT('Overdue: ', t.task_code, ' was auto-marked as failed') AS message,
              0 AS isRead, NOW() AS createdAt, t.task_code AS taskCode, t.title AS taskTitle, 'overdue' AS type
       FROM tasks t
       WHERE t.employee_id = ?
         AND t.status = 'failed'
         AND t.failed_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)`,
      [req.user.id]
    )

    const rows = [...dueSoon, ...overdue, ...stored].slice(0, 20)
    const unread = rows.filter((n) => !n.isRead).length

    return res.json({ notifications: rows, unreadCount: unread })
  } catch (error) {
    console.error('Get notifications error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const markNotificationsRead = async (req, res) => {
  try {
    await pool.query(
      'UPDATE task_notifications SET is_read = 1 WHERE user_id = ?',
      [req.user.id]
    )
    return res.json({ message: 'All notifications marked as read' })
  } catch (error) {
    console.error('Mark notifications read error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
