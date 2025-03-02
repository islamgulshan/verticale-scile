import { Module } from '@nestjs/common';
import { SystemNotificationController } from './system-notification/system-notification.controller';
import { ConfigService } from '../services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MomentsNotificationController } from './moments-notification/moments-notification.controller';
import { RelationsNotificationController } from './relations-notification/relations-notification.controller';
import { LiveStreamsNotificationController } from './live-streams-notification/live-streams-notification.controller';
import { CommunitiesNotificationController } from './communities-notification/communities-notification.controller';
import { InboxNotificationController } from './inbox-notification/inbox-notification.controller';
import { PicksNotificationController } from './picks-notification/picks-notification.controller';
import { PostsNotificationController } from './posts-notification/posts-notification.controller';

@Module({

  controllers: [SystemNotificationController, MomentsNotificationController, RelationsNotificationController, LiveStreamsNotificationController, CommunitiesNotificationController, InboxNotificationController, PicksNotificationController, PostsNotificationController],
  providers: [ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('userService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class NotificationsModule { }
