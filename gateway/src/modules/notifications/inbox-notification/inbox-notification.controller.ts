import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../../constants/jwt.constant';
import { InboxNotificationDto } from './dtos';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
@ApiTags('inbox-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('inbox-notification')
export class InboxNotificationController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-inbox-notification')
  async create(@Body() dto: InboxNotificationDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-inbox-notification', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-inbox-notification')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-inbox-notification', request.user?._id),
    );
  }
}
