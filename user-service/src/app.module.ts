import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { BullModule } from '@nestjs/bull';
import { RateLimiter } from 'bull';
import { ScheduleModule } from '@nestjs/schedule';
import { FilesModule } from './files/files.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';



@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema:validationSchema,

      isGlobal: true,
    }),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService ],

})
export class AppModule {

}
