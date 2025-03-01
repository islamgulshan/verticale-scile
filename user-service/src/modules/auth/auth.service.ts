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

      const username=await this.usersService.findOne({user_name:payload.user_name})
      if(username) throw new ConflictException("user name already exist");

      await this.usersService.verifyOtp(payload.email,payload.code)
      return this.usersService.create(payload)
    }
    async signIn( payload: SignInDto):Promise<any> {
      const filter={}
      if(payload.user_name){
        filter["user_name"]=payload.user_name
      }else if (payload.email){
        filter["email"]=payload.email
      }
        const user=await this.usersService.findOne(filter)
        if (!user) throw new BadRequestException("Invalid Credential");
        const validPass = await bcrypt.compare(payload.password, user.password);
        if (!validPass) throw new BadRequestException("Invalid Credential");
        const token=await this.jwtToken(user)
         delete user['password']
         delete user['_doc']['password']
          return {...(user["_doc"] || user),token}
      }

      async jwtToken(user:any) {
        return this.jwtService.sign(
            { id: user._id, email: user.email },
            { expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '7h' } 
          );
        
      }
}
