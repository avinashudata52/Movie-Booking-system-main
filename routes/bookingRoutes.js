// routes/bookingRoutes.js

import express from 'express';
import { createBooking, getBookingById, getUserBookings, cancelBooking } from '../controllers/_Booking.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth(), createBooking);
router.get('/:id', auth(), getBookingById);
router.get('/user/:userId', auth(), getUserBookings);
router.delete('/:id', auth(), cancelBooking);

export default router;
