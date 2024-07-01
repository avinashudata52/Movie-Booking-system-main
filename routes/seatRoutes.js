// routes/seatRoutes.js

import express from 'express';
import { getSeatsByScreen, updateSeatStatus } from '../controllers/_Seat.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/screen/:screenId', getSeatsByScreen);
router.put('/:id/status', auth('admin'), updateSeatStatus);

export default router;
