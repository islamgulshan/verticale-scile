import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos';

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
    
}
