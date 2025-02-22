import {Body,Controller,Delete,Get,Inject,Param,Post, Put} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../constants/jwt.constant';
import { SkipAuth } from '../auth/decorators/skip.auth.decorator';
import { CreateUserSettingDto, UpdateUserSettingDto } from './dtos/user.setting.dto';

@ApiBearerAuth(TOKEN_NAME)
@Controller('users')
@ApiTags('User')
export class UserSettingController {
    constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
  @ApiOperation({ summary: 'Create User Setting' })
  @SkipAuth()
  @Post('create-user-setting')
  public async getOtp(@Body() body: CreateUserSettingDto) {
    console.log(body)
    return await firstValueFrom(this.UserServiceClient.send('create-user-setting', body))
  }

  // ✅ Get All User Settings
  @ApiOperation({ summary: 'Get All User Settings' })
  @SkipAuth()
  @Get('user-settings')
  public async findAll() {
    return await firstValueFrom(this.UserServiceClient.send('get-user-settings', {}));
  }

  // ✅ Get User Setting By ID
  @SkipAuth()
  @ApiOperation({ summary: 'Get User Setting By ID' })
  @Get('user-setting/:id')
  public async findById(@Param('id') id: string) {
    return await firstValueFrom(this.UserServiceClient.send('get-user-setting', id));
  }

  // ✅ Get User Setting By User ID
  @SkipAuth()
  @ApiOperation({ summary: 'Get User Setting By User ID' })
  @Get('user-setting/user/:user_id')
  public async findByUserId(@Param('user_id') user_id: string) {
    return await firstValueFrom(this.UserServiceClient.send('get-user-setting-by-user', user_id));
  }

  // ✅ Update User Setting
  @SkipAuth()
  @ApiOperation({ summary: 'Update User Setting' })
  @Put('update-user-setting/:id')
  public async update(@Param('id') id: string, @Body() body: UpdateUserSettingDto) {
    return await firstValueFrom(this.UserServiceClient.send('update-user-setting', { id, ...body }));
  }

  // ✅ Delete User Setting
  @SkipAuth()
  @ApiOperation({ summary: 'Delete User Setting' })
  @Delete('delete-user-setting/:id')
  public async delete(@Param('id') id: string) {
    return await firstValueFrom(this.UserServiceClient.send('delete-user-setting', { id }));
  }
}

