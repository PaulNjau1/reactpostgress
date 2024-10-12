import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' }); // Send response without using return
    return; // Exit the function early
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }; // Cast decoded to your expected type
    req.user = decoded; // Attach the user information to the request object
    next(); // Call next to pass control to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' }); // Send response without using return
    return; // Exit the function early
  }
};
