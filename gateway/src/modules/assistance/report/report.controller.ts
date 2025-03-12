import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '../../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AssistanceReportDto, CreateReportAccountRecoveryDto } from './dtos';
import { SkipAuth } from '../../../auth/decorators/skip.auth.decorator';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Assistance report')
@Controller('assistance-report')
export class ReportController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() dto: AssistanceReportDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-assistance-report', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @ApiOperation({
    summary: 'Get monetization list with optional user filter & pagination',
  })
  @ApiQuery({
    name: 'user_id',
    required: false,
    example: '',
    description: 'Optional user ID to filter',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Items per page',
  })
  @Get()
  async getList(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('user_id') user_id?: string,
  ) {
    const payload = {
      user_id: user_id,
      page: Number(page),
      limit: Number(limit),
    };
    return await firstValueFrom(
      this.UserServiceClient.send('get-assistance-report', payload),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('delete-assistance-report', id),
    );
  }
  @SkipAuth()
  @Post('account-recovery-report')
  async CreateaccountRecoveryReport(
    @Body() dto: CreateReportAccountRecoveryDto,
  ) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-account-recovery-report', {
        ...dto,
      }),
    );
  }

  @ApiOperation({
    summary: 'Get Account Recovery & pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Items per page',
  })
  @Get('get-account-recovery-reports')
  async accountRecoveryReport(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const payload = {
      page: Number(page),
      limit: Number(limit),
    };
    console.log(payload);
    return await firstValueFrom(
      this.UserServiceClient.send('get-account-recovery-reports', payload),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('get-assistance-report-by-id', id),
    );
  }
}
