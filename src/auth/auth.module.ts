import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import UserService from 'src/users/application/service/user.service';
import { UserDomainService } from 'src/users/domain/services/user-domain.service';
import UserRepository from 'src/users/repositories/user.repository';
import { AuthController } from './presentation/controller/auth.controller';
import AuthService from './application/service/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from 'src/infraestructure/config/config.service';
import { ConfigModule } from 'src/infraestructure/config/config.module';
import AuthRepository from './repositories/auth.repository';
import { JwtStrategy } from 'src/common/guards/jwt-strategy';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpiration },
      }),
    }),
  ],
  providers: [
    PrismaService,
    UserRepository,
    UserService,
    UserDomainService,
    AuthRepository,
    AuthService,
    JwtStrategy
  ],
})
export class AuthModule {}
