import {Body,Controller,Delete,Get,Inject,Param,Post, Put, Req} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../constants/jwt.constant';
import { SkipAuth } from '../auth/decorators/skip.auth.decorator';
import { CreateUserSettingDto, UpdateUserSettingDto } from './dtos/user.setting.dto';

@ApiBearerAuth(TOKEN_NAME)
@Controller('user-setting')
@ApiTags('User Setting')
export class UserSettingController {
    constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
  @ApiOperation({ summary: 'Create User Setting' })
  @Post('create-user-setting')
  public async createUserSetting(@Body() body: CreateUserSettingDto,@Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('create-user-setting', {...body,user_id:request.user._id}))
  }

  // ✅ Get All User Settings
  @ApiOperation({ summary: 'Get All User Settings' })
  @Get('user-settings')
  public async findAll() {
    return await firstValueFrom(this.UserServiceClient.send('get-user-settings', {}));
  }

  // ✅ Get User Setting By ID
  @ApiOperation({ summary: 'Get User Setting By ID' })
  @Get('user-setting/:id')
  public async findById(@Param('id') id: string) {
    return await firstValueFrom(this.UserServiceClient.send('get-user-setting', id));
  }

  // ✅ Get User Setting By User ID
  @ApiOperation({ summary: 'Get User Setting By User ID' })
  @Get('user-setting/user/:user_id')
  public async findByUserId(@Param('user_id') user_id: string) {
    return await firstValueFrom(this.UserServiceClient.send('get-user-setting-by-user', user_id));
  }

  // ✅ Update User Setting
  @ApiOperation({ summary: 'Update User Setting' })
  @Put('update-user-setting')
  public async update(@Body() body: UpdateUserSettingDto,@Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('update-user-setting', { user_id:request.user._id, ...body }));
  }

  // ✅ Delete User Setting
  @ApiOperation({ summary: 'Delete User Setting' })
  @Delete('delete-user-setting')
  public async delete(@Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('delete-user-setting', request.user._id));
  }
}

