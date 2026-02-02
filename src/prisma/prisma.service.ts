import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaNeon(client);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
