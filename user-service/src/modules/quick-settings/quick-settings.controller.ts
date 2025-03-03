import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuickSettingsService } from './quick-settings.service';
import { QuickSettings } from './quick-settings.schema';

@Controller('app-settings')
export class QuickSettingsController {
    constructor(private readonly quickSettingsService: QuickSettingsService) { }
        @MessagePattern('create-quick-settings')
        create(@Payload() dto: Partial<QuickSettings>) {
            return this.quickSettingsService.create(dto);
        }
        @MessagePattern('user-quick-settings')
        getByUser(@Payload() user_id: Partial<QuickSettings>) {
            return this.quickSettingsService.getByUser(user_id);
        }
}
