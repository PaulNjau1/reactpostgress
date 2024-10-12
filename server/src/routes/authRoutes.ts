import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// POST /api/auth/register - Register a new user
router.post('/register', register);

// POST /api/auth/login - Log in an existing user
// @ts-ignore
router.post('/login', login);

export default router;
