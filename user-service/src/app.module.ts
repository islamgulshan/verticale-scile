import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EmailModule } from './modules/email/email.module';
import { UserSettingModule } from './modules/user-setting/user-setting.module';
import { ProfileModule } from './modules/profile/profile.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { QuickSettingsModule } from './modules/quick-settings/quick-settings.module';
import { TwoFactorAuthModule } from './modules/two-factor-auth/two-factor-auth.module';
import { PrivacyContentModule } from './modules/privacy-content/privacy-content.module';
import { MonetizationModule } from './modules/monetization/monetization.module';
import { AssistanceModule } from './modules/assistence/assitance.module';
import { BlockUserModule } from './modules/block-user/block-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validationSchema,

      isGlobal: true,
    }),
    AuthModule,
    EmailModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo_uri'),
        dbName: configService.get<string>('db_name'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    UserSettingModule,
    ProfileModule,
    NotificationsModule,
    QuickSettingsModule,
    AccountsModule,
    TwoFactorAuthModule,
    PrivacyContentModule,
    MonetizationModule,
    AssistanceModule,
    BlockUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
