import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPass = process.env.ADMIN_PASSWORD || "Admin123!";
  const hash = await bcrypt.hash(adminPass, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, password: hash, role: "admin" },
    update: {}
  });

  console.log("Seed: usuario admin listo:", adminEmail);
}

main().finally(async () => prisma.$disconnect());
