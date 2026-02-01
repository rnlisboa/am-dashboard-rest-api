import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/infraestructure/config/config.service';
import UserService from 'src/users/application/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: (req) => req?.cookies?.access_token,
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }
}
