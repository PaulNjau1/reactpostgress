// src/types/Deal.ts
export interface Deal {
    id: number;
    title: string;
    description: string;
    category: string;
    subcategory: string;
    image_url: string;
    user_id: number;
    created_at: string;
    likes: number;
    username: string; // Add this field to include the username of the deal poster
  }
  