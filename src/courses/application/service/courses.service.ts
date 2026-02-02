import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseFilters } from 'src/courses/domain/interface/course-filters.interface';
import { CourseRepository } from 'src/courses/repositories/courses.repository';

@Injectable()
export default class CoursesService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async findAllStatsWithFilter(filters?: CourseFilters) {
    return await this.courseRepository.findAllStatsWithFilter(filters);
  }

  async findAllStats() {
    return await this.courseRepository.findAllStats();
  }
}
