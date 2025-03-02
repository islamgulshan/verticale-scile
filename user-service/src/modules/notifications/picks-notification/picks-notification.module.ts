import { Module } from '@nestjs/common';
import { PicksNotificationService } from './picks-notification.service';
import { PicksNotificationController } from './picks-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PicksNotifaction, PicksNotifactionSchema } from './picks.notification.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PicksNotifaction.name, schema: PicksNotifactionSchema }])],
  providers: [PicksNotificationService],
  controllers: [PicksNotificationController]
})
export class PicksNotificationModule { }
