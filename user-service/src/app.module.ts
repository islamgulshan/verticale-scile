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
import { AppSettingsModule } from './modules/app-settings/app-settings.module';
import { AccountsModule } from './modules/accounts/accounts.module';

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
    AppSettingsModule,
    AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
