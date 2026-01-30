import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AuthRepository from "src/auth/repositories/auth.repository";
import { AppConfigService } from "src/infraestructure/config/config.service";

@Injectable()
export default class AuthService {
   constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
    private readonly configService: AppConfigService
  ) {} 
}