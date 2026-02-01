import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';

@Injectable()
export default class UserRepository {
  constructor(private readonly prismaCliente: PrismaService) {}

  async create(createUser: CreateUserDto) {
    const newUser = await this.prismaCliente.user.create({
      data: createUser,
    });

    return newUser;
  }

  async findOne(id: string) {
    const user = await this.prismaCliente.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new Error('Email é obrigatório.');
    }

    const user = await this.prismaCliente.user.findUnique({
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUser: UpdateUserDto) {
    const updatedUser = this.prismaCliente.user.update({
      where: { id },
      data: {
        ...updateUser,
      },
    });

    return updatedUser;
  }
}
