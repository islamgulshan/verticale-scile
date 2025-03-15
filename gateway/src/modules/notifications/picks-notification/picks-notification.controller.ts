import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { TOKEN_NAME } from '../../../constants/jwt.constant';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PicksNotificationDto } from './dtos';
@ApiTags('picks-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('picks-notification')
export class PicksNotificationController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-picks-notification')
  async create(@Body() dto: PicksNotificationDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-picks-notification', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-picks-notification')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-picks-notification', request.user?._id),
    );
  }
}
