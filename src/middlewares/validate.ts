import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ message: 'Bad request', details: error.details });
    req.body = value;
    next();
  };
