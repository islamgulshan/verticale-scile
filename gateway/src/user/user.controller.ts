import {
    Body,
    Controller,
    Get,
    Inject,
    Put,
    Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { UpdateUserDto } from './dto/update.user.dto';
import { TOKEN_NAME } from '../constants/jwt.constant';
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
}

