import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger.js';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};
