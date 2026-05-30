import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const run = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'employee_management',
  })

  try {
    await connection.query(
      'ALTER TABLE users CHANGE COLUMN password_hash password VARCHAR(255) NOT NULL'
    )
  } catch {
    // Column may already be named password
  }

  await connection.query("UPDATE users SET password = 'mi@123' WHERE role = 'admin'")
  await connection.query("UPDATE users SET password = '123' WHERE role = 'employee'")

  await connection.end()

  console.log('Passwords set to plain text!')
  console.log('Admin:  admin@gmail.com / mi@123')
  console.log('Employee: rahul@gmail.com / 123')
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
