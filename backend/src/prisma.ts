import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined. Please set DATABASE_URL.');
}

// Pass PoolConfig directly to PrismaNeon (Prisma 7.x API)
export const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: dbUrl }),
});
