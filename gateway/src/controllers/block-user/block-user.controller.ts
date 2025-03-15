import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BlockUserDto } from './dtos/block-user.dto';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Block User')
@Controller('block-user')
export class BlockUserController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post('block-user')
  async block(@Body() dto: BlockUserDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('block-user', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Post('unblock-user')
  async unblock(@Body() dto: BlockUserDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('unblock-user', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Get('get-block-users')
  async getBlockUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('get-block-user', request.user?._id),
    );
  }
}
