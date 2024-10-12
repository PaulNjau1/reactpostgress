import { Request, Response } from 'express';
import pool from '../config/db';

export const getDeals = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await pool.query('SELECT * FROM deals ORDER BY created_at DESC');
    return res.json(result.rows);
   
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching deals' });
  }
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
