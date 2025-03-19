import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
import { subscriptionDto } from './dtos';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('google pay')
@Controller('google-pay')
export class GooglePayController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post('google-pay')
  async processPayment(@Body() dto: any, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('google-pay', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Post('google-pay-subscription')
  async subscription(@Body() dto: subscriptionDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('google-pay-subscription', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
}
