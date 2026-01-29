import { Module } from '@nestjs/common';
import UserService from './application/service/user.service';
import UserRepository from './repositories/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserService, UserRepository, PrismaService],
})
export class UsersModule {}
