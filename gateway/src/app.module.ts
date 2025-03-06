import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { UserController } from './user/user.controller';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import configuration from './config/configuration';
import { configValidationSchema } from './config/validation';
import { ConfigModule } from '@nestjs/config';
import { UserSettingController } from './user-setting/user.setting.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { AppSettingsController } from './quick-settings/quick-settings.controller';
import { AccountsController } from './accounts/accounts.controller';
import { TwoFactorAuthController } from './two-factor-auth/two-factor-auth.controller';
import { PrivacyContentController } from './privacy-content/privacy-content.controller';
import { AccountMonetizationController } from './account-monetization/account-monetization.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configValidationSchema,
    }),
    AuthModule,
    NotificationsModule,
  ],
  controllers: [
    UserController,
    UserSettingController,
    ProfileController,
    AppSettingsController,
    AccountsController,
    TwoFactorAuthController,
    PrivacyContentController,
    AccountMonetizationController,
  ],
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
export class AppModule {}
