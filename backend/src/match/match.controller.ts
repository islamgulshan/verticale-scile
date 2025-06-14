import { Controller, Get, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MatchDto } from './match.dto';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  @ApiOperation({ summary: 'Get top 3 candidate matches for a given job' })
  @ApiResponse({
    status: 200,
    description: 'Array of matched candidates with similarity scores',
    type: MatchDto,
    isArray: true,
  })
  async getMatches(@Query('jobId') jobId: string) {
    return this.matchService.match(jobId);
  }

  @Get('result')
  @ApiOperation({ summary: 'Fetch matching results from cache' })
  @ApiResponse({
    status: 200,
    description: 'Matched candidates for jobId',
    type: MatchDto,
    isArray: true,
  })
  async getMatchResults(@Query('jobId') jobId: string) {
    return this.matchService.getCachedResults(jobId);
  }
}
