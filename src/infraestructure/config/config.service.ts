import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env.schema';

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

  get jwtExpiration(): string {
    return this.envConfig.JWT_EXPIRES_IN;
  }

  get frontendUrl(): string {
    return this.envConfig.FRONTEND_URL;
  }

  get frontendLoginCallbackEndpoint(): string {
    return this.envConfig.FRONTEND_LOGIN_CALLBACK_ENDPOINT;
  }
}
