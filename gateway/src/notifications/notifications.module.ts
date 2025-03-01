import { Module } from '@nestjs/common';
import { SystemNotificationController } from './system-notification/system-notification.controller';
import { ConfigService } from '../services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({

  controllers: [SystemNotificationController],
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
