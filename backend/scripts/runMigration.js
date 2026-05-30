import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sqlPath = path.resolve(__dirname, '../database/02_task_enhancements.sql')

const run = async () => {
  console.log('Running task schema migration...')
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  })

  const sql = fs.readFileSync(sqlPath, 'utf8')
  await connection.query(sql)
  await connection.end()
  console.log('Migration complete. Dummy tasks removed. New task fields ready.')
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
