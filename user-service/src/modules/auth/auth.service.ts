import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private readonly configService: ConfigService,
        private jwtService: JwtService,

    ) { }
    async signUp( payload: CreateUserDto):Promise<any> {
      const user=await this.usersService.findOne({email:payload.email})
      if(user) throw new ConflictException("user already exist with  this email");
      await this.usersService.verifyOtp(payload.email,payload.code)
      return this.usersService.create(payload)
    }
    async signIn( payload: SignInDto):Promise<any> {
        const user:any=await this.usersService.findOne({email:payload.email})
        if (!user) throw new BadRequestException("Invalid Credential");
        const validPass = await bcrypt.compare(payload.password, user.password);
        if (!validPass) throw new BadRequestException("Invalid Credential");
        const token=await this.jwtToken(user)
          return {...user._doc,token}
      }

      async jwtToken(user:any) {
        return this.jwtService.sign(
            { id: user._id, email: user.email },
            { expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '7h' } 
          );
        
      }
}
