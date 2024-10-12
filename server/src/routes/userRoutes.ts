// src/routes/userRoutes.ts
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { getUserById, updateUserProfile } from '../models/User';

const router = express.Router();

// Fetch user profile
router.get('/profile', authenticate, async (req, res) => {
  const user = await getUserById(req.user.userId);
  res.json(user);
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  const { username, email } = req.body;
  const updatedUser = await updateUserProfile(req.user.userId, username, email);
  res.json(updatedUser);
});

export default router;
