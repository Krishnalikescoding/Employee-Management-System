import { Router } from 'express'
import { getEmployees, getEmployeeWorkload } from '../controllers/users.controller.js'
import { authenticate, requireRole } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/employees', authenticate, requireRole('admin'), getEmployees)
router.get('/employees/:id/workload', authenticate, requireRole('admin'), getEmployeeWorkload)

export default router
