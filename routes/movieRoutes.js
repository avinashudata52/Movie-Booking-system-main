// routes/movieRoutes.js

import express from 'express';
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/_Movie.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', auth('admin'), createMovie); // by admin
router.put('/:id', auth('admin'), updateMovie); // by admin
router.delete('/:id', auth('admin'), deleteMovie); // by admin

export default router;
