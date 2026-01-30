import { Module } from '@nestjs/common';
import UserService from './application/service/user.service';
import UserRepository from './repositories/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDomainService } from './domain/services/user-domain.service';

@Module({
  imports: [PrismaService],
  providers: [UserService, UserRepository, PrismaService, UserDomainService],
})
export class UsersModule {}
