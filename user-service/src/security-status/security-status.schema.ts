import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SecurityStatus extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;
  @Prop({ type: Boolean, default: false })
  enable_security_notification: boolean;
}

export const SecurityStatusSchema =
  SchemaFactory.createForClass(SecurityStatus);
