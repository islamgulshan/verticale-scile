import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MomentsNotifactionDto } from './dtos';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants/jwt.constant';

@ApiTags('moments-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('moments-notification')
export class MomentsNotificationController {
    constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
    @Post("create-update-moments-notification")
    async create(@Body() dto: MomentsNotifactionDto, @Req() request: any) {
        return await firstValueFrom(this.UserServiceClient.send('create-moments-notification', { ...dto, user_id: request.user?._id }))
    }
    @Get("user-moments-notification")
    async getByUser(@Req() request: any) {
        return await firstValueFrom(this.UserServiceClient.send('user-moments-notification', request.user?._id))
    }
}
