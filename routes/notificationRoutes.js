// routes/notificationRoutes.js

import express from 'express';
import { getUserNotifications, markNotificationAsRead } from '../controllers/_Notification.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/user/:userId', auth(), getUserNotifications);
router.put('/:id/read', auth(), markNotificationAsRead);

export default router;
