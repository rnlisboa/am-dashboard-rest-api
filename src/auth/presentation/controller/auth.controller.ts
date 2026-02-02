import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import AuthService from 'src/auth/application/service/auth.service';
import { AuthLoginDto } from 'src/auth/domain/dto/auth-login.dto';
import { AuthRegisterDTO } from 'src/auth/domain/dto/auth-register.dto';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import UserService from 'src/users/application/service/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body() authLoginDto: AuthLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.login(authLoginDto);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {
      message: 'Login realizado com sucesso',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDTO) {
    return await this.userService.create(authRegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@User() user) {
    return { me: user };
  }
}
