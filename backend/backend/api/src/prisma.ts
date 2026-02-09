import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

// Select DB URL based on NODE_ENV for runtime
let dbUrl = process.env.DATABASE_URL_DEV;
if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.DATABASE_URL_PROD;
} else if (process.env.NODE_ENV === 'staging') {
  dbUrl = process.env.DATABASE_URL_STAGING;
}

const pool = new Pool({
  connectionString: dbUrl!,
  ssl: { rejectUnauthorized: false },
});

export const prisma = new PrismaClient({
  adapter: new PrismaNeon(pool as any),
});
