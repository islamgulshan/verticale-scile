import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { UserController } from './user/user.controller';
// import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import configuration from './config/configuration';
import { configValidationSchema } from './config/validation';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { UserSettingController } from './user-setting/user.setting.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configValidationSchema,
    }),
AuthModule
  ],
  controllers: [UserController,UserSettingController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [ConfigService],
})
export class AppModule { }
