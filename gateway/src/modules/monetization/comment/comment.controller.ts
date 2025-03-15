import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../../constants';
import { ClientProxy } from '@nestjs/microservices';
import { CommentMonetizationDto } from './dtos';
import { firstValueFrom } from 'rxjs';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Comment Monetization')
@Controller('comment')
export class CommentController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post('create-update-comment-monetization')
  async create(@Body() dto: CommentMonetizationDto, @Req() request: any) {
    console.log(dto);
    return await firstValueFrom(
      this.UserServiceClient.send('create-comment-monetization', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-comment-monetization')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send(
        'user-comment-monetization',
        request.user?._id,
      ),
    );
  }
}
