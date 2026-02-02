import { Module } from '@nestjs/common';
import CoursesService from 'src/courses/application/service/courses.service';
import { CourseRepository } from 'src/courses/repositories/courses.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CoursesService, CourseRepository, PrismaService],
})
export class DashboardModule {}
