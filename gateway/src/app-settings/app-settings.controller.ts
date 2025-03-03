import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppSettingsDtos } from './dtos';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../constants/jwt.constant';
@ApiTags('app-settings')
@ApiBearerAuth(TOKEN_NAME)
@Controller('app-settings')
export class AppSettingsController {
        constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
        @Post("create-update-app-settings")
        async create(@Body() dto: AppSettingsDtos, @Req() request: any) {
            return await firstValueFrom(this.UserServiceClient.send('create-app-settings', { ...dto, user_id: request.user?._id }))
        }
        @Get("user-picks-notification")
        async getByUser(@Req() request: any) {
            return await firstValueFrom(this.UserServiceClient.send('user-app-settings', request.user?._id))
        }
}
