import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LiveSettingsMonetizationDto } from './dtos';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Live Settings Monetization')
@Controller('live-settings')
export class LiveSettingsController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post('create-update-live-settings-monetization')
  async create(@Body() dto: LiveSettingsMonetizationDto, @Req() request: any) {
    console.log(dto);
    return await firstValueFrom(
      this.UserServiceClient.send('create-live-settings-monetization', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-live-settings-monetization')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send(
        'user-live-settings-monetization',
        request.user?._id,
      ),
    );
  }
}
