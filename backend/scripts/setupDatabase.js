import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sqlPath = path.resolve(__dirname, '../database/01_phase1_schema_and_seed.sql')
const dbName = process.env.DB_NAME || 'employee_management'
const shouldReset = process.argv.includes('--reset')

const run = async () => {
  console.log('Connecting to MySQL...')

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  })

  if (shouldReset) {
    console.log(`Resetting database "${dbName}"...`)
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``)
  } else {
    const [databases] = await connection.query(
      'SHOW DATABASES LIKE ?',
      [dbName]
    )

    if (databases.length > 0) {
      await connection.query(`USE \`${dbName}\``)
      const [tables] = await connection.query("SHOW TABLES LIKE 'users'")

      if (tables.length > 0) {
        const [[{ count }]] = await connection.query(
          'SELECT COUNT(*) AS count FROM users'
        )

        if (count > 0) {
          console.log(`Database "${dbName}" is already set up (${count} users).`)
          console.log('Nothing to do. Start the app with: npm run dev')
          console.log('To wipe and recreate from scratch: npm run db:reset')
          await connection.end()
          return
        }
      }
    }
  }

  const sql = fs.readFileSync(sqlPath, 'utf8')

  console.log('Running database setup from:', sqlPath)
  await connection.query(sql)
  await connection.end()

  console.log('Done! Database "employee_management" is ready.')
  console.log('Test login: admin@gmail.com / mi@123')
}

run().catch((error) => {
  console.error('\nDatabase setup failed:\n')
  if (error.code === 'ECONNREFUSED') {
    console.error('MySQL is not running. Start MySQL in XAMPP (or your MySQL service), then run again.')
  } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
    console.error('Wrong username/password. Update DB_USER and DB_PASSWORD in backend/.env')
  } else {
    console.error(error.message)
  }
  process.exit(1)
})
