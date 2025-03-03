import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppSettings } from './app-settings.schema';
import { AppSettingsService } from './app-settings.service';

@Controller('app-settings')
export class AppSettingsController {
    constructor(private readonly communitiesNotificationService: AppSettingsService) { }
        @MessagePattern('create-app-settings')
        create(@Payload() dto: Partial<AppSettings>) {
            return this.communitiesNotificationService.create(dto);
        }
        @MessagePattern('user-app-settings')
        getByUser(@Payload() user_id: Partial<AppSettings>) {
            return this.communitiesNotificationService.getByUser(user_id);
        }
}
