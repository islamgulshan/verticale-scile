import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../../../constants';
import { SystemNotifactionDto } from './dtos';

@ApiTags('system-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('system-notification')
export class SystemNotificationController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-system-notification')
  async create(@Body() dto: SystemNotifactionDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-system-notification', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-system-notification')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send(
        'user-system-notification',
        request.user?._id,
      ),
    );
  }
}
