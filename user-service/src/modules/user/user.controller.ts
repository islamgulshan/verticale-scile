import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { getUsersDto } from './dtos';
import { User } from './user.schema';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) { }
    @MessagePattern('get-user-by-id')
    async getUserById(@Payload() id: string) {
      return await this.usersService.getById(id)
    }

    @MessagePattern('get-otp')
    async getOtp(@Payload() email: string) {
      return await this.usersService.getOtp(email)
    }

    @MessagePattern('reset-password')
    async resetPassord(@Payload() payload: any) {
      return await this.usersService.resetPassword(payload)
    }

    @MessagePattern('update-user')
    async update(@Payload() payload:any) {
      return await this.usersService.update(payload.id,payload)
    }

    @MessagePattern('get-users')
    async findAll(@Payload() args:getUsersDto) {
      return await this.usersService.findAll(args.search,args.page,args.limit)
    }
    @MessagePattern('get-user')
    async get(@Payload() id:string) {
      console.log(id)
      return await this.usersService.getById(id)
    }
    
    @MessagePattern('delete-user')
    async delete(@Payload() id:string) {
      return await this.usersService.delete(id)
    }

    @MessagePattern('change-password')
    async changePassword(@Payload() payload: Partial<User>) {
      return await this.usersService.changePassword(payload)
    }
    
    @MessagePattern('login-user-detail')
    async LoginDetails(@Payload() user_id:string) {
      return await this.usersService.LoginDetails(user_id)
    }
}
