import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  ChangePasswordDto,
  ResetPasswordDto,
  UpdateUserDto,
} from './dto/update.user.dto';
import { TOKEN_NAME } from '../constants/jwt.constant';
import { GetOtp } from './dto/otp.dto';
import { SkipAuth } from '../auth/decorators/skip.auth.decorator';

@ApiBearerAuth(TOKEN_NAME)
@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Get('login-user')
  async get_users(@Req() req: any) {
    return req.user;
  }

  @Put('update-user')
  public async updateUser(@Body() body: UpdateUserDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('update-user', {
        ...body,
        id: request.user?._id,
      }),
    );
  }

  // @Get('get-users')
  // public async getUsers(@Query("search") search?:string) {
  //   return await firstValueFrom(this.UserServiceClient.send('get-users', search))
  // }
  @Get('get-users')
  public async getUsers(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const payload = { search, page, limit };
    return await firstValueFrom(
      this.UserServiceClient.send('get-users', payload),
    );
  }

  @Get('get-user/:id')
  public async getUserById(@Param('id') id: string) {
    return await firstValueFrom(this.UserServiceClient.send('get-user', id));
  }

  @Delete('delete-user')
  public async deleteUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('delete-user', request.user?._id),
    );
  }

  @SkipAuth()
  @Post('get-otp')
  public async getOtp(@Body() body: GetOtp) {
    return await firstValueFrom(
      this.UserServiceClient.send('get-otp', body.email),
    );
  }

  @SkipAuth()
  @Post('reset-password')
  public async resetPassword(@Body() body: ResetPasswordDto) {
    return await firstValueFrom(
      this.UserServiceClient.send('reset-password', body),
    );
  }

  @Post('change-password')
  public async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() request: any,
  ) {
    return await firstValueFrom(
      this.UserServiceClient.send('change-password', {
        ...body,
        _id: request?.user?._id,
      }),
    );
  }

  @Get('login-user-detail')
  public async loginUserDetail(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('login-user-detail', request?.user?._id),
    );
  }
}
