import { Injectable, ConflictException } from '@nestjs/common';
import UserRepository from 'src/users/repositories/user.repository';

@Injectable()
export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  async ensureUserDoesNotExist(email: string): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new ConflictException('Usuário com este email já existe');
    }
  }
}
