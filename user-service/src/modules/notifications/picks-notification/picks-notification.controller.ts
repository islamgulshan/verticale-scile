import { Controller } from '@nestjs/common';
import { PicksNotificationService } from './picks-notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PicksNotifaction } from './picks.notification.schema';

@Controller('picks-notification')
export class PicksNotificationController {
    constructor(private readonly picksNotificationService: PicksNotificationService) { }
    @MessagePattern('create-picks-notification')
    create(@Payload() dto: Partial<PicksNotifaction>) {
        return this.picksNotificationService.create(dto);
    }
    @MessagePattern('user-picks-notification')
    getByUser(@Payload() user_id: Partial<PicksNotifaction>) {
        return this.picksNotificationService.getByUser(user_id);
    }
}
