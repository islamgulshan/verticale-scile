import { Module } from '@nestjs/common';
import { InboxNotificationService } from './inbox-notification.service';
import { InboxNotificationController } from './inbox-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InboxNotifaction, InboxNotifactionSchema } from './inbox-notification.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: InboxNotifaction.name, schema: InboxNotifactionSchema }])],
  providers: [InboxNotificationService],
  controllers: [InboxNotificationController]
})
export class InboxNotificationModule { }
