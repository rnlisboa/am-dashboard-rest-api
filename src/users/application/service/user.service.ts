import { Injectable } from '@nestjs/common';
import Password from 'src/shared/domain/value-objects/password';
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/domain/dto/update-user.dto';
import { UserEntity } from 'src/users/domain/entities/user.entity';
import { UserDomainService } from 'src/users/domain/services/user-domain.service';
import UserRepository from 'src/users/repositories/user.repository';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async create(createUser: CreateUserDto) {
    await this.userDomainService.ensureUserDoesNotExist(createUser.email);

    const password = new Password({ value: createUser.password });
    const hashedPassword = await password.toHashed();

    const newUser = await this.userRepository.create({
      ...createUser,
      password: hashedPassword,
    });

    return newUser;
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('No user with this id.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }
}
