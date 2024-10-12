// src/services/deal.ts
import axios from 'axios';
import { Deal } from '../types/Deal';

const API_URL = 'http://localhost:5000/api/deals';

export const getDeals = async (): Promise<Deal[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// src/services/deal.ts

export const createDeal = async (
  dealData: Omit<Deal, 'id' | 'user_id' | 'created_at'|'likes'|'username'>,
  token: string
): Promise<Deal> => {
  const response = await axios.post(
    'http://localhost:5000/api/deals',
    dealData, // Only send necessary data
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
