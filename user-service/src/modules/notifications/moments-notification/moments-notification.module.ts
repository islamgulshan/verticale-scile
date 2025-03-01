import { Module } from '@nestjs/common';
import { MomentsNotificationService } from './moments-notification.service';
import { MomentsNotificationController } from './moments-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MomentsNotifaction, MomentsNotifactionSchema } from './moments.notification.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: MomentsNotifaction.name, schema: MomentsNotifactionSchema }])],
    providers: [MomentsNotificationService],
    controllers: [MomentsNotificationController],
    exports: [MomentsNotificationModule]
})
export class MomentsNotificationModule { }
