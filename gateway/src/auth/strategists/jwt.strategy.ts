// src/auth/strategies/jwt.strategy.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from './../../constants/jwt.constant';
// import { firstValueFrom } from 'rxjs';
// import { ClientProxy } from '@nestjs/microservices';

interface Payload {
  id: string;  
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    // @Inject('USER_SERVICE') private readonly RtspServiceClient: ClientProxy
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.SECRET,
    });
    
  }

  async validate(payload: Payload): Promise<any> {
    // const user =  await firstValueFrom(this.RtspServiceClient.send('get-user', payload.id))
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return payload;
  }
}
