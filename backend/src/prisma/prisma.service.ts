import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Node.js environments without native WebSocket support (Node.js < 22)
neonConfig.webSocketConstructor = ws;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined. Please set DATABASE_URL.');
    }

    // Pass PoolConfig directly to PrismaNeon (Prisma 7.x API)
    super({
      adapter: new PrismaNeon({ connectionString: dbUrl }),
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connected (runtime)');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Prisma disconnected');
  }
}
