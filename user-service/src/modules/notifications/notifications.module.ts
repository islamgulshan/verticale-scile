import { Module } from '@nestjs/common';
import { SystemNotificationModule } from './system-notification/system-notification.module';

@Module({
  imports: [SystemNotificationModule]
})
export class NotificationsModule { }
