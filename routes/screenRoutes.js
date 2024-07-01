// routes/screenRoutes.js

import express from 'express';
import { getScreens, getScreenById, createScreen, updateScreen, deleteScreen } from '../controllers/_Screen.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getScreens);
router.get('/:id', getScreenById);
router.post('/', auth('admin'), createScreen); // by admin
router.put('/:id', auth('admin'), updateScreen); // by admin
router.delete('/:id', auth('admin'), deleteScreen); // by admin

export default router;
