import speakeasy from 'speakeasy';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function enableTOTP(userId: string) {
  const secret = speakeasy.generateSecret({ length: 20 });
  await prisma.user.update({ where: { id: userId }, data: { totpSecret: secret.base32 }});
  return { otpauth_url: secret.otpauth_url, base32: secret.base32 };
}

export async function verifyTOTP(userId: string, token: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }});
  if (!user?.totpSecret) return false;
  return speakeasy.totp.verify({ secret: user.totpSecret, encoding: 'base32', token, window: 1 });
}
