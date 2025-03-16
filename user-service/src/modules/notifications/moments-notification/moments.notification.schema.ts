import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MomentNotificationType } from 'src/constants/common';

@Schema({ timestamps: true })
export class MomentsNotifaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;
  @Prop({ default: false })
  from_connected_user: boolean;
  @Prop({ default: false })
  from_subscription: boolean;
  @Prop({
    enum: MomentNotificationType,
    default: MomentNotificationType.EVERY_ONE,
  })
  moment_liked: MomentNotificationType;
  @Prop({
    enum: MomentNotificationType,
    default: MomentNotificationType.EVERY_ONE,
  })
  donation_moment: MomentNotificationType;
  @Prop({
    enum: MomentNotificationType,
    default: MomentNotificationType.EVERY_ONE,
  })
  tagged_moment: MomentNotificationType;
  @Prop({
    enum: MomentNotificationType,
    default: MomentNotificationType.EVERY_ONE,
  })
  tagged_18_moment: MomentNotificationType;
  @Prop({
    enum: MomentNotificationType,
    default: MomentNotificationType.EVERY_ONE,
  })
  partnership: MomentNotificationType;
}

export const MomentsNotifactionSchema =
  SchemaFactory.createForClass(MomentsNotifaction);
