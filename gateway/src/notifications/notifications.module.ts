import { Module } from '@nestjs/common';
import { SystemNotificationController } from './system-notification/system-notification.controller';
import { ConfigService } from '../services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MomentsNotificationController } from './moments-notification/moments-notification.controller';
import { RelationsNotificationController } from './relations-notification/relations-notification.controller';
import { LiveStreamsNotificationController } from './live-streams-notification/live-streams-notification.controller';

@Module({

  controllers: [SystemNotificationController, MomentsNotificationController, RelationsNotificationController, LiveStreamsNotificationController],
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
