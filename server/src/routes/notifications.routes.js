import { Router } from 'express'
import { getNotifications, markNotificationsRead } from '../controllers/notifications.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', authenticate, getNotifications)
router.patch('/read', authenticate, markNotificationsRead)

export default router
