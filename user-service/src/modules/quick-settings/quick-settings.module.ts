import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuickSettings, QuickSettingsSchema } from './quick-settings.schema';
import { QuickSettingsService } from './quick-settings.service';
import { QuickSettingsController } from './quick-settings.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: QuickSettings.name, schema: QuickSettingsSchema }])],
  providers: [QuickSettingsService],
  controllers: [QuickSettingsController],
  exports: [QuickSettingsService],

})
export class QuickSettingsModule {}
