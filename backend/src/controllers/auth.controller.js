import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

const toPublicUser = (row) => ({
  id: row.id,
  email: row.email,
  firstName: row.first_name,
  role: row.role,
})

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, email, password, first_name, role, is_active FROM users WHERE email = ? LIMIT 1',
      [email.trim()]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = rows[0]

    if (!user.is_active) {
      return res.status(403).json({ message: 'Account is disabled' })
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    return res.json({
      token,
      user: toPublicUser(user),
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Server error during login' })
  }
}

export const getMe = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, first_name, role FROM users WHERE id = ? AND is_active = 1 LIMIT 1',
      [req.user.id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ user: toPublicUser(rows[0]) })
  } catch (error) {
    console.error('Get me error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
