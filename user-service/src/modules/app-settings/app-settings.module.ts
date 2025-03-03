import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { AppSettings, AppSettingsSchema } from './app-settings.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: AppSettings.name, schema: AppSettingsSchema }])],
  providers: [AppSettingsService],
  controllers: [AppSettingsController],
  exports: [AppSettingsService],

})
export class AppSettingsModule {}
