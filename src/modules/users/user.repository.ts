import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export function createUser(data: { email: string; passwordHash: string; name: string }) {
  return prisma.user.create({ data });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}