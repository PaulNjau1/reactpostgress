import { Request, Response } from 'express';
import pool from '../config/db';

// src/models/Deal.ts

// Get all deals with usernames of the posters
export const getAllDeals = async () => {
    const result = await pool.query(`
      SELECT deals.*, users.username
      FROM deals
      JOIN users ON deals.user_id = users.id
      ORDER BY deals.created_at DESC
    `);
    return result.rows;
  };
  

export const createDeal = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, category, subcategory, image_url } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized, user not found' });
  }

  const userId = req.user.userId;

  try {
    const result = await pool.query(
      'INSERT INTO deals (title, description, category, subcategory, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, category, subcategory, image_url, userId]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating deal' });
  }
};
