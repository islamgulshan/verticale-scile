// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from 'src/constant';
import { User } from 'src/modules/user/user.schema';
import { UserService } from 'src/modules/user/user.service';



interface Payload {
  id: string;  // Use 'sub' to represent user ID in JWT
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.SECRET,
    });
  }

  async validate(payload: Payload): Promise<User> {
    // Find the user and populate roles and permissions
    console.log('Payload:', payload)
    const user: User | null = await this.userService.findOne({_id:payload.id});
    if (!user) {
      throw new UnauthorizedException();
    }

    // console.log('Authenticated user with roles and permissions:', user);
    return user;
  }
}
