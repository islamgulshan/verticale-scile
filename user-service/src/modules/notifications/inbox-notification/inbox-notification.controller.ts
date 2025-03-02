import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InboxNotificationService } from './inbox-notification.service';
import { InboxNotifaction } from './inbox-notification.schema';

@Controller('inbox-notification')
export class InboxNotificationController {
    constructor(private readonly communitiesNotificationService: InboxNotificationService) { }
    @MessagePattern('create-inbox-notification')
    create(@Payload() dto: Partial<InboxNotifaction>) {
        return this.communitiesNotificationService.create(dto);
    }
    @MessagePattern('user-inbox-notification')
    getByUser(@Payload() user_id: Partial<InboxNotifaction>) {
        return this.communitiesNotificationService.getByUser(user_id);
    }
}
