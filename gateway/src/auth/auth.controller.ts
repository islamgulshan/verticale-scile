import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { SkipAuth } from './decorators/skip.auth.decorator';
import * as geoip from 'geoip-lite';
import * as useragent from 'useragent';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly USER_SERVICE_CLIENT: ClientProxy,
  ) {}

  @SkipAuth()
  @Post('signup')
  @ApiOperation({ summary: 'User Signup', description: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async signup(@Body() data: CreateUserDto) {
    return await firstValueFrom(this.USER_SERVICE_CLIENT.send('sign-up', data));
  }

  @SkipAuth()
  @ApiOperation({ summary: 'User Login', description: 'Authenticate a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() data: SignInDto, @Req() request: any) {
    const agent = useragent.parse(request.headers['user-agent'] || '');
    const device =
      agent.device.toString() || agent.os.toString() || 'Unknown Device';
    const ipAddress =
      (request.headers['x-forwarded-for'] as string) ||
      request.socket.remoteAddress ||
      'Unknown IP';
    const geo = geoip.lookup(ipAddress);
    const location = geo
      ? `${geo.city || 'City'}, ${geo.country || ' Country'}`
      : 'Unknown';
    const loginTime = new Date().toLocaleString('en-GB');
    return await firstValueFrom(
      this.USER_SERVICE_CLIENT.send('sign-in', {
        ...data,
        metaData: {
          device,
          location,
          loginTime,
        },
      }),
    );
  }
}
