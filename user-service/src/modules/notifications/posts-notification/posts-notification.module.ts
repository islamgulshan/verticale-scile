import { Module } from '@nestjs/common';
import { PostsNotificationController } from './posts-notification.controller';
import { PostsNotificationService } from './posts-notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsNotifaction, PostsNotifactionSchema } from './post-notifcations.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PostsNotifaction.name, schema: PostsNotifactionSchema }])],
  controllers: [PostsNotificationController],
  providers: [PostsNotificationService],
  exports: [PostsNotificationService]
})
export class PostsNotificationModule { }
