import { Module } from '@nestjs/common';
import { SystemNotificationModule } from './system-notification/system-notification.module';
import { MomentsNotificationModule } from './moments-notification/moments-notification.module';
import { RelationsNotificationModule } from './relations-notification/relations-notification.module';

@Module({
  imports: [SystemNotificationModule, MomentsNotificationModule, RelationsNotificationModule]
})
export class NotificationsModule { }
