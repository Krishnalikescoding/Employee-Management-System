import { Router } from 'express'
import { createTask, getAllTasks, getMyTasks, updateTaskStatus } from '../controllers/tasks.controller.js'
import { authenticate, requireRole } from '../middleware/auth.middleware.js'
import { uploadTaskFiles } from '../middleware/upload.middleware.js'

const router = Router()

const handleUpload = (req, res, next) => {
  uploadTaskFiles(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message })
    next()
  })
}

router.post('/', authenticate, requireRole('admin'), handleUpload, createTask)
router.get('/my', authenticate, requireRole('employee'), getMyTasks)
router.get('/all', authenticate, requireRole('admin'), getAllTasks)
router.patch('/:id/status', authenticate, requireRole('employee'), updateTaskStatus)

export default router
