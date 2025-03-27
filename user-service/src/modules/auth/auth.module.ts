import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategists/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConstants } from 'src/constants/common';
import { UserSettingModule } from '../user-setting/user-setting.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JwtConstants.SECRET,
      signOptions: JwtConstants.signOptions,
    }),
    UserModule,
    UserSettingModule,
    ProfileModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
