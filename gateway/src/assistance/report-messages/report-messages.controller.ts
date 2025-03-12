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
import { TOKEN_NAME } from '../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AdminReportReplyDto, ReportMessagesDto } from './dtos';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('report-messages')
@Controller('report-messages')
export class ReportMessagesController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post()
  async message(@Body() dto: ReportMessagesDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('report-message', {
        ...dto,
        user_id: request.user?._id,
        message_sender: request.user?._id,
      }),
    );
  }

  @Post('admin-reply')
  async adminReply(@Body() dto: AdminReportReplyDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('admin-reply-message', {
        ...dto,
        message_sender: request.user?._id,
      }),
    );
  }
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
  async getUserChat(
    @Req() request: any,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const payload = {
      page: Number(page),
      limit: Number(limit),
      user_id: request.user?._id,
    };
    return await firstValueFrom(
      this.UserServiceClient.send('get-user-report-chat', payload),
    );
  }
}
