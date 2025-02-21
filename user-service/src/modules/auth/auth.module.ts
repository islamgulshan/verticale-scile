import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConstants } from 'src/constant';
import { JwtStrategy } from './strategists/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
      JwtModule.register({
      secret: JwtConstants.SECRET,
      signOptions: JwtConstants.signOptions,
    }),
    UserModule],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy],
    exports:[JwtModule,AuthService],
})
export class AuthModule {}
