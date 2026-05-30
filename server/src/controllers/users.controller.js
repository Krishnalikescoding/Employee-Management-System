import pool from '../config/db.js'

export const getEmployeeWorkload = async (req, res) => {
  const { id } = req.params

  try {
    const [[{ activeCount }]] = await pool.query(
      `SELECT COUNT(*) AS activeCount FROM tasks
       WHERE employee_id = ? AND status NOT IN ('completed', 'failed')`,
      [id]
    )

    return res.json({ employeeId: Number(id), activeCount })
  } catch (error) {
    console.error('Get workload error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const getEmployees = async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, email, first_name AS firstName
       FROM users
       WHERE role = 'employee' AND is_active = 1
       ORDER BY first_name ASC`
    )

    return res.json({ employees: rows })
  } catch (error) {
    console.error('Get employees error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
