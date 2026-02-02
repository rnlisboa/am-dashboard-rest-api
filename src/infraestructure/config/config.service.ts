import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env.schema';
import type { JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AppConfigService {
  private readonly envConfig: EnvConfig;

  constructor(configService: ConfigService) {
    const envConfig = configService.get<EnvConfig>('envConfig');
    if (!envConfig) {
      throw new Error('Configuration not found');
    }
    this.envConfig = envConfig;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get jwtRefreshSecret(): string {
    return this.envConfig.JWT_REFRESH_SECRET;
  }

  get jwtExpiration(): JwtSignOptions['expiresIn'] {
    return this.envConfig.JWT_EXPIRES_IN as JwtSignOptions['expiresIn'];
  }

  get jwtRefreshExpiration(): JwtSignOptions['expiresIn'] {
    return this.envConfig.JWT_REFRESH_EXPIRES_IN as JwtSignOptions['expiresIn'];
  }

  get frontendUrl(): string {
    return this.envConfig.FRONTEND_URL;
  }

  get frontendLoginCallbackEndpoint(): string {
    return this.envConfig.FRONTEND_LOGIN_CALLBACK_ENDPOINT;
  }
}
