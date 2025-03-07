import { Controller } from '@nestjs/common';
import { LiveSettingsService } from './live-settings.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LiveSettingMonetization } from './live-settings.schema';

@Controller('live-settings')
export class LiveSettingsController {
  constructor(private readonly liveSettingsService: LiveSettingsService) {}
  @MessagePattern('create-live-settings-monetization')
  create(@Payload() dto: Partial<LiveSettingMonetization>) {
    return this.liveSettingsService.create(dto);
  }
  @MessagePattern('user-live-settings-monetization')
  getByUser(@Payload() user_id: Partial<LiveSettingMonetization>) {
    return this.liveSettingsService.getByUser(user_id);
  }
}
