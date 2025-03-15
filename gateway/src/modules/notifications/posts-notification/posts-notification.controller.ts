import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { PostNotificationDto } from './dtos';
import { firstValueFrom } from 'rxjs';
@ApiTags('posts-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('posts-notification')
export class PostsNotificationController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-posts-notification')
  async create(@Body() dto: PostNotificationDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-posts-notification', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-posts-notification')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-posts-notification', request.user?._id),
    );
  }
}
