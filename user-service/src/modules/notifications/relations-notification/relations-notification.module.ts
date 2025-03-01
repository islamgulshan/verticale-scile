import { Module } from '@nestjs/common';
import { RelationsNotificationService } from './relations-notification.service';
import { RelationsNotificationController } from './relations-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationsNotifaction, RelationsNotifactionSchema } from './relation.notification.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RelationsNotifaction.name, schema: RelationsNotifactionSchema }])],
  providers: [RelationsNotificationService],
  controllers: [RelationsNotificationController],
  exports: [RelationsNotificationService]
})
export class RelationsNotificationModule { }
