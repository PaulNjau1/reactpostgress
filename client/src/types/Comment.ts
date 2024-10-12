// src/types/Comment.ts
export interface Comment {
    id: number;
    content: string;
    user_id: number;
    deal_id: number;
    username: string; // This should be the username of the person who posted the comment
    created_at: string; // Timestamp of when the comment was created
  }
  