import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import UserService from 'src/users/application/service/user.service';
import { UserDomainService } from 'src/users/domain/services/user-domain.service';
import UserRepository from 'src/users/repositories/user.repository';

@Module({
  providers: [PrismaService, UserRepository, UserService, UserDomainService],
})
export class AuthModule {}
