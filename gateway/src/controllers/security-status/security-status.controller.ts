import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
import { SecurityStatusDto } from './dtos';
@ApiTags('security-status')
@ApiBearerAuth(TOKEN_NAME)
@Controller('security-status')
export class SecurityStatusController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post()
  async create(@Body() dto: SecurityStatusDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-security-status', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Get()
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-security-status', request.user?._id),
    );
  }
}
