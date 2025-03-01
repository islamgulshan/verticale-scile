import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RelationsNotifaction } from './relation.notification.schema';
import { RelationsNotificationService } from './relations-notification.service';

@Controller('relations-notification')
export class RelationsNotificationController {
    constructor(private readonly relationNotificationService: RelationsNotificationService) { }
    @MessagePattern('create-relations-notification')
    create(@Payload() dto: Partial<RelationsNotifaction>) {
        return this.relationNotificationService.create(dto);
    }
    @MessagePattern('user-relations-notification')
    getByUser(@Payload() user_id: Partial<RelationsNotifaction>) {
        return this.relationNotificationService.getByUser(user_id);
    }
}
