import {
    Body,
    Controller,
    Inject,
    Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import {SkipAuth} from "./decorators/skip.auth.decorator"
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    // constructor(@Inject('CAMERA_RTSP_SERVICE') private readonly RtspServiceClient: ClientProxy,
    // ) { }
    @SkipAuth()
    @Post('signup')
    @ApiOperation({ summary: 'User Signup', description: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async signup(@Body() data: SignUpDto) {
        // return await firstValueFrom(this.RtspServiceClient.send('signup', data))

    }
    @SkipAuth()
    @ApiOperation({ summary: 'User Login', description: 'Authenticate a user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @Post('login')
    async login(@Body() data: SignInDto) {
        // return await firstValueFrom(this.RtspServiceClient.send('login', data))

    }
}
