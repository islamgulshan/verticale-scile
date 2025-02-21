import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '../user/dtos';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) { }
    @MessagePattern('sign-up')
    async signUp(@Payload() payload: CreateUserDto) {
        console.log(payload,"sign-up")
      return await this.authService.signUp(payload)
    }

}
