import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../../../constants';
import { CommunitiesNotificationDto } from './dtos';
@ApiTags('communities-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('communities-notification')
export class CommunitiesNotificationController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-communities-notification')
  async create(@Body() dto: CommunitiesNotificationDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-communities-notification', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-communities-notification')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send(
        'user-communities-notification',
        request.user?._id,
      ),
    );
  }
}
