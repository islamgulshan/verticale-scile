import { Body, Controller, Delete, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountsDtos, DeActivateAccountDto } from './dtos';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../constants/jwt.constant';
@ApiTags('accounts')
@ApiBearerAuth(TOKEN_NAME)
@Controller('accounts')
export class AccountsController {
     constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
            @Post("create-accounts")
            async create(@Body() dto: AccountsDtos, @Req() request: any) {
                return await firstValueFrom(this.UserServiceClient.send('create-accounts', { ...dto, user_id: request.user?._id }))
            }
            @Get("get-user-account")
            async getByUser(@Req() request: any) {
                return await firstValueFrom(this.UserServiceClient.send('user-accounts', request.user?._id))
            }

            @Post("de-active")
            async deActive(@Body() dto:DeActivateAccountDto,@Req() request: any) {
                return await firstValueFrom(this.UserServiceClient.send('decativation-accounts', {...dto,user_id:request.user?._id}))
            }
            @Delete("delete-account")
            async delete(@Req() request: any) {
                return await firstValueFrom(this.UserServiceClient.send('delete-accounts', request.user?._id))
            }
}
