import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) { }
    @MessagePattern('sign-ups')
    async signUp(@Payload() payload: CreateUserDto) {
        console.log("controller1",payload)

      return await this.usersService.create(payload)
    }
}
