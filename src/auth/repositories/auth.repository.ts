import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import UserRepository from 'src/users/repositories/user.repository';
import { AuthLoginDto } from '../domain/dto/auth-login.dto';
import Password from 'src/shared/domain/value-objects/password';

@Injectable()
export default class AuthRepository {
  constructor(
    private readonly prismaCliente: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async login({ email, password }: AuthLoginDto) {
    const user = await this.prismaCliente.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error('Email ou senha invalidos');

    const passwordVO = new Password({ value: password });
    const matchPass = await passwordVO.matches(user.password);

    if (!matchPass) throw new Error('Email ou senha invalidos');

    return user;
  }
}
