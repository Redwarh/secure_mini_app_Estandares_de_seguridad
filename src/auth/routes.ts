import { Router } from 'express';
import Joi from 'joi';
import { validate } from '../middlewares/validate.js';
import { login, register } from './service.js';
import { requireAuth } from '../users/rbac.js';
import { enableTOTP, verifyTOTP } from './totp.js';

const router = Router();

router.post('/register',
  validate(Joi.object({ email: Joi.string().email().required(), password: Joi.string().min(8).required() })),
  async (req, res, next) => {
    try {
      const out = await register(req.body.email, req.body.password);
      res.status(201).json(out);
    } catch (e) { next(e); }
  });

router.post('/login',
  validate(Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() })),
  async (req, res, next) => {
    try { res.json(await login(req.body.email, req.body.password)); }
    catch (e) { next(e); }
  });

router.post('/mfa/enable', requireAuth, async (req: any, res, next) => {
  try { res.json(await enableTOTP(req.user.sub)); }
  catch (e) { next(e); }
});

router.post('/mfa/verify',
  validate(Joi.object({ token: Joi.string().length(6).required() })),
  requireAuth,
  async (req: any, res, next) => {
    try { res.json({ valid: await verifyTOTP(req.user.sub, req.body.token) }); }
    catch (e) { next(e); }
  });

export default router;
