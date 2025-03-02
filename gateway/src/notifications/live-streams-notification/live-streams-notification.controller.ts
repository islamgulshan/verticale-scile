import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../../constants/jwt.constant';
import { LiveStreamsNotifactionDto } from './dtos';
@ApiTags('live-streams-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('live-streams-notification')
export class LiveStreamsNotificationController {
    constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
    @Post("create-update-live-streams-notification")
    async create(@Body() dto: LiveStreamsNotifactionDto, @Req() request: any) {
        return await firstValueFrom(this.UserServiceClient.send('create-live-streams-notification', { ...dto, user_id: request.user?._id }))
    }
    @Get("user-live-streams-notification")
    async getByUser(@Req() request: any) {
        return await firstValueFrom(this.UserServiceClient.send('user-live-streams-notification', request.user?._id))
    }
}
