import { Module } from '@nestjs/common';
import { CommunitiesNotificationService } from './communities-notification.service';
import { CommunitiesNotificationController } from './communities-notification.controller';
import { CommunitiesNotifaction, CommunitiesNotifactionSchema } from './communities-notification.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: CommunitiesNotifaction.name, schema: CommunitiesNotifactionSchema }])],
  providers: [CommunitiesNotificationService],
  controllers: [CommunitiesNotificationController]
})
export class CommunitiesNotificationModule { }
