import { Controller } from '@nestjs/common';
import { PostsNotificationService } from './posts-notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostsNotifaction } from './post-notifcations.schema';

@Controller('posts-notification')
export class PostsNotificationController {
    constructor(private readonly postsNotificationService: PostsNotificationService) { }
    @MessagePattern('create-posts-notification')
    create(@Payload() dto: Partial<PostsNotifaction>) {
        return this.postsNotificationService.create(dto);
    }
    @MessagePattern('user-posts-notification')
    getByUser(@Payload() user_id: Partial<PostsNotifaction>) {
        return this.postsNotificationService.getByUser(user_id);
    }
}
