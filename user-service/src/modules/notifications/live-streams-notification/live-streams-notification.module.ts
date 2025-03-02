import { Module } from '@nestjs/common';
import { LiveStreamsNotificationService } from './live-streams-notification.service';
import { LiveStreamsNotificationController } from './live-streams-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LiveStreamsNotifaction, LiveStreamsNotifactionSchema } from './live-stream-notification.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: LiveStreamsNotifaction.name, schema: LiveStreamsNotifactionSchema }])],
  providers: [LiveStreamsNotificationService],
  controllers: [LiveStreamsNotificationController],
  exports: [LiveStreamsNotificationService],

})
export class LiveStreamsNotificationModule { }
