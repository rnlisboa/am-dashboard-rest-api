import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import UserRepository from 'src/users/repositories/user.repository';

@Module({
  providers: [PrismaService, UserRepository],
})
export class AuthModule {}
