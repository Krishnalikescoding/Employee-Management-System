import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import pool from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import usersRoutes from './routes/users.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = ['http://localhost:5173', 'https://manthan-infotech-workforce.onrender.com']
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (no Origin header) and listed frontend URLs
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`))
      }
    },
  })
)
app.use(express.json())
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))

app.get('/', (_req, res) => {
  res.json({
    message: 'Employee Management API is running',
    health: '/api/health',
    login: 'POST /api/auth/login',
    frontend: process.env.CLIENT_URL || 'http://localhost:5173',
  })
})

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: error.message || error.code || String(error),
    })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/notifications', notificationsRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server listening on port ${PORT}`)
})
