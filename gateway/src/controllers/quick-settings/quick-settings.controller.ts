import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QuickSettingsDtos } from './dtos';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants/jwt.constant';
@ApiTags('quick-settings')
@ApiBearerAuth(TOKEN_NAME)
@Controller('quick-settings')
export class AppSettingsController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-quick-settings')
  async create(@Body() dto: QuickSettingsDtos, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-quick-settings', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-quick-settings')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-quick-settings', request.user?._id),
    );
  }
}
