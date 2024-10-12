// src/models/User.ts
import pool from '../config/db';

// Fetch user by ID
export const getUserById = async (userId: number) => {
  const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

// Update user profile
export const updateUserProfile = async (userId: number, username: string, email: string) => {
  const result = await pool.query(
    'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email',
    [username, email, userId]
  );
  return result.rows[0];
};
