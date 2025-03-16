import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
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
  ) {}
  async signUp(payload: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOne({
      email: { $regex: new RegExp(`^${payload.email}$`, 'i') },
    });
    if (user) throw new ConflictException('email already exist');

    const trimmedUsername = payload.user_name?.trim().replace(/\s+/g, '');
    const username = await this.usersService.findOne({
      user_name: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') },
    });
    if (username) throw new ConflictException('user name already exist');

    await this.usersService.verifyOtp(payload.email, payload.code);
    const createdUser = await this.usersService.create(payload);
    const token = await this.jwtToken(createdUser);
    return { ...(createdUser['_doc'] || createdUser), token };
  }
  async signIn(payload: SignInDto): Promise<any> {
    const filter = {};
    if (payload.email) {
      filter['email'] = { $regex: new RegExp(`^${payload.email}$`, 'i') };
    } else if (payload.user_name) {
      const trimmedUsername = payload.user_name?.trim().replace(/\s+/g, '');
      filter['user_name'] = { $regex: new RegExp(`^${trimmedUsername}$`, 'i') };
    }
    const user = await this.usersService.findOne(filter);
    if (!user) throw new BadRequestException('Invalid Credential');
    const validPass = await bcrypt.compare(payload.password, user.password);
    if (!validPass) throw new BadRequestException('Invalid Credential');
    const token = await this.jwtToken(user);
    delete user['password'];
    delete user['_doc']['password'];
    this.usersService.SaveLoginDetails({
      ...payload['metaData'],
      user_id: user['_id'],
    });
    return { ...(user['_doc'] || user), token };
  }

  async jwtToken(user: any) {
    return this.jwtService.sign(
      { id: user._id, email: user.email, user_name: user?.user_name },
      { expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '7h' },
    );
  }
}
