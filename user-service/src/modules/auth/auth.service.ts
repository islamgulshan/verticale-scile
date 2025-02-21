import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) { }
    async signUp( payload: CreateUserDto) {
      return this.usersService.create(payload)
    }
}
