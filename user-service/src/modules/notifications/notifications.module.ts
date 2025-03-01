import { Module } from '@nestjs/common';
import { SystemNotificationModule } from './system-notification/system-notification.module';
import { MomentsNotificationModule } from './moments-notification/moments-notification.module';

@Module({
  imports: [SystemNotificationModule, MomentsNotificationModule]
})
export class NotificationsModule { }
