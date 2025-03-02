import { Controller } from '@nestjs/common';
import { CommunitiesNotifaction } from './communities-notification.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommunitiesNotificationService } from './communities-notification.service';

@Controller('communities-notification')
export class CommunitiesNotificationController {
    constructor(private readonly communitiesNotificationService: CommunitiesNotificationService) { }
    @MessagePattern('create-communities-notification')
    create(@Payload() dto: Partial<CommunitiesNotifaction>) {
        return this.communitiesNotificationService.create(dto);
    }
    @MessagePattern('user-communities-notification')
    getByUser(@Payload() user_id: Partial<CommunitiesNotifaction>) {
        return this.communitiesNotificationService.getByUser(user_id);
    }
}
