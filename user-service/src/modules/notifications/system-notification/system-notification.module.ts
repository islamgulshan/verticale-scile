import { Module } from '@nestjs/common';
import { SystemNotificationService } from './system-notification.service';
import { SystemNotificationController } from './system-notification.controller';
import { SystemNotifaction, SystemNotifactionSchema } from './system.notification.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: SystemNotifaction.name, schema: SystemNotifactionSchema }])],
  providers: [SystemNotificationService],
  controllers: [SystemNotificationController],
  exports: [SystemNotificationService]
})
export class SystemNotificationModule { }
