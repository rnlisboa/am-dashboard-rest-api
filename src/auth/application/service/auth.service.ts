import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/auth/domain/dto/auth-login.dto';
import AuthRepository from 'src/auth/repositories/auth.repository';
import { AppConfigService } from 'src/infraestructure/config/config.service';
import { UserEntity } from 'src/users/domain/entities/user.entity';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
    private readonly configService: AppConfigService,
  ) {}

  async createAccessToken(user: UserEntity) {
    try {
      const secret = this.configService.jwtSecret;
      const expiration = this.configService.jwtExpiration;
      const accessToken = this.jwtService.sign(
        { name: user.name, email: user.email },
        {
          secret,
          expiresIn: expiration,
          subject: user.id as string,
        },
      );

      return accessToken;
    } catch (error) {
      throw new BadRequestException('Erro ao criar token');
    }
  }

  async createRefreshToken(user: UserEntity) {
    try {
      const secret = this.configService.jwtRefreshSecret;
      const expiration = this.configService.jwtRefreshExpiration;
      const refreshToken = this.jwtService.sign(
        { name: user.name, email: user.email },
        {
          secret,
          expiresIn: expiration,
          subject: user.id as string,
        },
      );

      return refreshToken ;
    } catch (error) {
      throw new BadRequestException('Erro ao criar refresh token');
    }
  }

  checkToken(token: string) {
    try {
      const secret = this.configService.jwtSecret;
      return this.jwtService.verify(token, { secret });
    } catch (error) {
      throw new Error(`Erro verificando token: ${error.message}`);
    }
  }

  async login(auth: AuthLoginDto) {
    const user = await this.repository.login(auth);
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return { user, accessToken, refreshToken };
  }
}
