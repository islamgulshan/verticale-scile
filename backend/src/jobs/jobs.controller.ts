import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job entry' })
  @ApiResponse({ status: 201, description: 'Job successfully saved.' })
  async create(@Body() dto: CreateJobDto) {
    return this.jobService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all jobs' })
  @ApiResponse({
    status: 200,
    description: 'An array of jobs',
    type: CreateJobDto,
    isArray: true,
  })
  async getAll(): Promise<CreateJobDto[]> {
    return this.jobService.list();
  }
}
