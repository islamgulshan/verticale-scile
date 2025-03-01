import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../../constants/jwt.constant';
import { RelationNotifactionDto } from './dtos';
@ApiTags('relations-notification')
@ApiBearerAuth(TOKEN_NAME)
@Controller('relations-notification')
export class RelationsNotificationController {
    constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
    @Post("create-update-relations-notification")
    async create(@Body() dto: RelationNotifactionDto, @Req() request: any) {
        return await firstValueFrom(this.UserServiceClient.send('create-relations-notification', { ...dto, user_id: request.user?._id }))
    }
    @Get("user-relations-notification")
    async getByUser(@Req() request: any) {
        return await firstValueFrom(this.UserServiceClient.send('user-relations-notification', request.user?._id))
    }
}
