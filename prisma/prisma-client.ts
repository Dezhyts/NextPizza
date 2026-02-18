import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, // твоя база
});

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Передаем хотя бы пустой объект, чтобы PrismaClient корректно создавался
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter }); // <- важное изменение

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
