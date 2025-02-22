
// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { skip_auth } from '../../constants/jwt.constant';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector, 
   @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,  
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
        const isSikAuth = this.reflector.get<boolean>(skip_auth, context.getHandler());

        if (isSikAuth) {
            return true; // Skip authentication
        }
        const request = context.switchToHttp().getRequest();
        const canActivate = await super.canActivate(context);
        if (!canActivate) {
            throw new UnauthorizedException("Pls login first");
        }

        const user = request.user;
        const {data} =  await firstValueFrom(this.UserServiceClient.send('get-user', user.id))
        if(!data) throw new UnauthorizedException('Authentication failed');
        request.user=data
        return true;
    }catch(error){
        if (error instanceof TokenExpiredError) {
            throw new UnauthorizedException('Session expired. Please log in again.');
        } else if (error instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Invalid token. Please log in again.');
        }
        throw new UnauthorizedException('Authentication failed');
    }
    }
}
