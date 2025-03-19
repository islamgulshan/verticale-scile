import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class GooglePay extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;
  @Prop({ type: Object })
  payment_detail: Object;
  @Prop({ type: Types.ObjectId, ref: 'Package' })
  package: Types.ObjectId;
  @Prop({ type: String, default: 'active' })
  status: string;
}

export const GooglePaySchema = SchemaFactory.createForClass(GooglePay);
