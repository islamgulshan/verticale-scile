import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SystemNotificationService } from './system-notification.service';
import { SystemNotifaction } from './system.notification.schema';

@Controller('system-notification')
export class SystemNotificationController {
    constructor(private readonly systemNotificationService: SystemNotificationService) { }
    @MessagePattern('create-system-notification')
    create(@Payload() dto: Partial<SystemNotifaction>) {
        return this.systemNotificationService.create(dto);
    }
    @MessagePattern('user-system-notification')
    getByUser(@Payload() user_id: Partial<SystemNotifaction>) {
        return this.systemNotificationService.getByUser(user_id);
    }

}
