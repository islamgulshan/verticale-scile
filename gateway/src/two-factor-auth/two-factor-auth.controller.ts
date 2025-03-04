import { Body, Controller, Get, Inject, Post, Put, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  TwoFactorAuthDto,
  UpdateTwoFactorAuthDto,
  VerifyTwoFactorAuthDto,
} from './dto';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../constants/jwt.constant';
@ApiTags('two-factor-auth')
@ApiBearerAuth(TOKEN_NAME)
@Controller('two-factor-auth')
export class TwoFactorAuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-two-factor')
  async create(@Body() dto: TwoFactorAuthDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-two-factor', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get('user-two-factor')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-two-factor', request.user?._id),
    );
  }

  @Put('update-two-factor')
  async update(@Body() dto: UpdateTwoFactorAuthDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('update-two-factor', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Post('verify-two-factor')
  async verify(@Body() dto: VerifyTwoFactorAuthDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('verify-two-factor', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
}
