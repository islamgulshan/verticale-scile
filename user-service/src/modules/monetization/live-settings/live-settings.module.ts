import { Module } from '@nestjs/common';
import { LiveSettingsController } from './live-settings.controller';
import { LiveSettingsService } from './live-settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LiveSettingMonetization,
  LiveSettingMonetizationSchema,
} from './live-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LiveSettingMonetization.name,
        schema: LiveSettingMonetizationSchema,
      },
    ]),
  ],
  controllers: [LiveSettingsController],
  providers: [LiveSettingsService],
  exports: [LiveSettingsService],
})
export class LiveSettingsModule {}
