import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { PostModule } from './modules/post/post.module';
import { SeasonModule } from './modules/season/season.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validationSchema,

      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo_uri'),
        dbName: configService.get<string>('db_name'),
      }),
      inject: [ConfigService],
    }),
    PostModule,
    SeasonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
