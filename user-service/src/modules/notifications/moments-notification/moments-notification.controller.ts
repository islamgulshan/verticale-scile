import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MomentsNotificationService } from './moments-notification.service';
import { MomentsNotifaction } from './moments.notification.schema';

@Controller('moments-notification')
export class MomentsNotificationController {
    constructor(private readonly momentsNotificationService: MomentsNotificationService) { }
    @MessagePattern('create-moments-notification')
    create(@Payload() dto: Partial<MomentsNotifaction>) {
        return this.momentsNotificationService.create(dto);
    }
    @MessagePattern('user-moments-notification')
    getByUser(@Payload() user_id: Partial<MomentsNotifaction>) {
        return this.momentsNotificationService.getByUser(user_id);
    }
}
