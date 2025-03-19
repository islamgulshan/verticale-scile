import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
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

  @Get('google-pay-subscription')
  async getList() {
    return await firstValueFrom(
      this.UserServiceClient.send('get-google-pay-subscription', {}),
    );
  }

  @Put(':id')
  async cancel(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('cancel-google-pay-subscription', id),
    );
  }
}
