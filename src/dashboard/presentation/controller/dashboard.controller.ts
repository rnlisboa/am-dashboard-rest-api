import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import CoursesService from 'src/courses/application/service/courses.service';
import { CourseFilters } from 'src/courses/domain/interface/course-filters.interface';

@Controller('dashboard')
export default class DashboardController {
  constructor(private readonly courseService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async courseStats() {
    return await this.courseService.findAllStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('data')
  async getDashboardData(@Query() query: CourseFilters) {
    return this.courseService.findAllStatsWithFilter({
      ...query,
      from: query.from ? new Date(query.from) : undefined,
      to: query.to ? new Date(query.to) : undefined,
    });
  }
}
