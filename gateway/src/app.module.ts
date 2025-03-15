import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import configuration from './config/configuration';
import { configValidationSchema } from './config/validation';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MonetizationModule } from './monetization/monetization.module';
import { UserController } from './controllers/user/user.controller';
import { UserSettingController } from './controllers/user-setting/user.setting.controller';
import { ProfileController } from './controllers/profile/profile.controller';
import { AppSettingsController } from './controllers/quick-settings/quick-settings.controller';
import { AccountsController } from './controllers/accounts/accounts.controller';
import { TwoFactorAuthController } from './controllers/two-factor-auth/two-factor-auth.controller';
import { PrivacyContentController } from './controllers/privacy-content/privacy-content.controller';
import { BlockUserController } from './controllers/block-user/block-user.controller';
import { UserConnectionController } from './controllers/user-connection/user-connection.controller';
import { AssistanceModule } from './modules/assistance/assistance.module';
import { GooglePayController } from './controllers/google-pay/google-pay.controller';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configValidationSchema,
    }),
    AuthModule,
    NotificationsModule,
    MonetizationModule,
    AssistanceModule,
  ],
  controllers: [
    UserController,
    UserSettingController,
    ProfileController,
    AppSettingsController,
    AccountsController,
    TwoFactorAuthController,
    PrivacyContentController,
    BlockUserController,
    UserConnectionController,
    GooglePayController,
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
