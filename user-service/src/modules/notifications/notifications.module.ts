import { Module } from '@nestjs/common';
import { SystemNotificationModule } from './system-notification/system-notification.module';
import { MomentsNotificationModule } from './moments-notification/moments-notification.module';
import { RelationsNotificationModule } from './relations-notification/relations-notification.module';
import { LiveStreamsNotificationModule } from './live-streams-notification/live-streams-notification.module';
import { CommunitiesNotificationModule } from './communities-notification/communities-notification.module';
import { InboxNotificationModule } from './inbox-notification/inbox-notification.module';
import { PicksNotificationModule } from './picks-notification/picks-notification.module';
import { PostsNotificationModule } from './posts-notification/posts-notification.module';

@Module({
  imports: [SystemNotificationModule, MomentsNotificationModule, RelationsNotificationModule, LiveStreamsNotificationModule, CommunitiesNotificationModule, InboxNotificationModule, PicksNotificationModule, PostsNotificationModule]
})
export class NotificationsModule { }
