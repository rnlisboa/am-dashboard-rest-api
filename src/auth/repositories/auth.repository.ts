import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import UserRepository from 'src/users/repositories/user.repository';

@Injectable()
export default class AuthRepository {
  constructor(
    private readonly prismaCliente: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}
}
