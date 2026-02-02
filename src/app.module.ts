import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from './infraestructure/config/config.module';
import { CoursesModule } from './courses/courses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import DashboardController from './dashboard/presentation/controller/dashboard.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule,
    CoursesModule,
    DashboardModule,
  ],
  controllers: [AppController, DashboardController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
