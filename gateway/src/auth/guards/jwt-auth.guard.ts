
// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { skip_auth } from '../../constants/jwt.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector, 
//    @Inject('CAMERA_RTSP_SERVICE') private readonly RtspServiceClient: ClientProxy,  
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isSikAuth = this.reflector.get<boolean>(skip_auth, context.getHandler());

        if (isSikAuth) {
            return true; // Skip authentication
        }
        const request = context.switchToHttp().getRequest();
        const canActivate = await super.canActivate(context);
        if (!canActivate) {
            throw new UnauthorizedException();
        }

        const user = request.user;
        // request.user =  await firstValueFrom(this.RtspServiceClient.send('getUser', user._id.toString()))
       
        return true;
    }
}
