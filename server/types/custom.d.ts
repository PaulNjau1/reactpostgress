// src/types/custom.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: number }; // or add additional properties as needed
    }
  }
}
