import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TwoFactorAuth extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;
  @Prop({ type: Number })
  pin: number;
  @Prop({ type: Boolean, default: false })
  two_factor_enable: boolean;
}

export const TwoFactorAuthSchema = SchemaFactory.createForClass(TwoFactorAuth);
