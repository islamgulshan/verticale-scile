import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { PrivacyContentDto } from './dtos';
import { firstValueFrom } from 'rxjs';
@ApiTags('privacy-content')
@ApiBearerAuth(TOKEN_NAME)
@Controller('privacy-content')
export class PrivacyContentController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-content-privacy')
  async create(@Body() dto: PrivacyContentDto, @Req() request: any) {
    console.log(dto);
    return await firstValueFrom(
      this.UserServiceClient.send('create-privacy-content', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-content-privacy')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-privacy-content', request.user?._id),
    );
  }
}
