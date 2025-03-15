import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { DirectMessageDto } from './dtos';
import { firstValueFrom } from 'rxjs';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Direct Message Monetization')
@Controller('direct-message')
export class DirectMessageController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post('create-update-direct-message')
  async create(@Body() dto: DirectMessageDto, @Req() request: any) {
    console.log(dto);
    return await firstValueFrom(
      this.UserServiceClient.send('create-direct-message', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-direct-message')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-direct-message', request.user?._id),
    );
  }
}
