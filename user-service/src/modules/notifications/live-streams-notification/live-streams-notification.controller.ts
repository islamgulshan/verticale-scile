import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LiveStreamsNotifaction } from './live-stream-notification.schema';
import { LiveStreamsNotificationService } from './live-streams-notification.service';

@Controller('live-streams-notification')
export class LiveStreamsNotificationController {
    constructor(private readonly momentsNotificationService: LiveStreamsNotificationService) { }
    @MessagePattern('create-live-streams-notification')
    create(@Payload() dto: Partial<LiveStreamsNotifaction>) {
        return this.momentsNotificationService.create(dto);
    }
    @MessagePattern('user-live-streams-notification')
    getByUser(@Payload() user_id: Partial<LiveStreamsNotifaction>) {
        return this.momentsNotificationService.getByUser(user_id);
    }
}
