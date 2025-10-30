import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config.js';

const prisma = new PrismaClient();

export async function register(email: string, password: string) {
  const hash = await bcrypt.hash(password, 12); // hashing + salting
  const user = await prisma.user.create({ data: { email, password: hash }});
  return { id: user.id, email: user.email };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, config.jwt.secret, { expiresIn: '1h' });
  return { token };
}
