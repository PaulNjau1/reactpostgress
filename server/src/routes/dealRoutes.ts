import express from 'express';
import { getDeals, createDeal } from '../controllers/dealController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// GET /api/deals - Fetch all deals
// @ts-ignore
router.get('/', getDeals);

// POST /api/deals - Create a new deal (requires authentication)
// @ts-ignore
router.post('/', authenticate, createDeal);

export default router;
