import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createUser(data: { email: string; passwordHash: string; name: string }) {
  return prisma.user.create({ data });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}