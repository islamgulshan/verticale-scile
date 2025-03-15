import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './../constants';
import { AuthController } from './auth.controller';
import { PermissionsGuard } from './guards/permissions.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategists/jwt.strategy';
import { ConfigService } from '../services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

const importsAndExport = [
  JwtModule.register({
    secret: JwtConstants.SECRET,
    signOptions: JwtConstants.signOptions,
  }),
];

@Module({
  imports: [...importsAndExport],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    PermissionsGuard,
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('userService'));
      },
      inject: [ConfigService],
    },
  ],
  exports: [],
})
export class AuthModule {}
