import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
import { ConnectionUserDto } from './dtos';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('User Connection')
@Controller('user-connection')
export class UserConnectionController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post('user-connection')
  async connect(@Body() dto: ConnectionUserDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-connection', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Post('user-request-connection')
  async request(@Body() dto: ConnectionUserDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-request-connection', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Post('user-remove-connection')
  async remove(@Body() dto: ConnectionUserDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-remove-connection', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Get('get-user-connections')
  async getConnection(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('get-user-connection', request.user?._id),
    );
  }

  @Get('get-user-connections-request')
  async getConnectionRequest(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send(
        'get-user-connection-request',
        request.user?._id,
      ),
    );
  }
}
