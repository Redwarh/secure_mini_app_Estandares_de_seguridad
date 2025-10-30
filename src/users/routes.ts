import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from './rbac.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, requireRole('admin'), async (_req, res) => {
  const users = await prisma.user.findMany({ select: { id:true, email:true, role:true, createdAt:true }});
  res.json(users);
});

export default router;
