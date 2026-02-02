import { Module } from '@nestjs/common';
import { CourseRepository } from './repositories/courses.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import CoursesService from './application/service/courses.service';

@Module({
  providers: [CourseRepository, PrismaService, CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
