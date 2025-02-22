import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ResetPasswordDto, UpdateUserDto } from './dto/update.user.dto';
import { TOKEN_NAME } from '../constants/jwt.constant';
import { GetOtp } from './dto/otp.dto';
import { SkipAuth } from '../auth/decorators/skip.auth.decorator';

@ApiBearerAuth(TOKEN_NAME)
@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
    ) { }

    @Get('login-user')
    async get_users(@Req() req:any) {
        return  req.user
    }

  @Put('update-user')
  public async updateUser(@Body() body: UpdateUserDto,@Req() request: any) {
    const userId = request.user?.id;
    return await firstValueFrom(this.UserServiceClient.send('updateUser', {...body,id:userId}))
  }
  @SkipAuth()
  @Post('get-otp')
  public async getOtp(@Body() body: GetOtp) {
    console.log(body)
    return await firstValueFrom(this.UserServiceClient.send('get-otp', body.email))
  }
  
  @SkipAuth()
  @Post('reset-password')
  public async resetPassword(@Body() body: ResetPasswordDto) {
    console.log(body)
    return await firstValueFrom(this.UserServiceClient.send('reset-password', body))
  }
}

