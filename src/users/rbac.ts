import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    (req as any).user = jwt.verify(token, config.jwt.secret);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
