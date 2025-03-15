import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WhoCanMessageYou } from 'src/constants/common';

@Schema({ timestamps: true })
export class DirectMessageMonetization extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  charge_direct_message: boolean;

  @Prop({ type: Number })
  amount_direct_message: number;

  @Prop({ enum: WhoCanMessageYou, default: WhoCanMessageYou.EVERY_ONE })
  who_can_direct_message: WhoCanMessageYou;
}

const DirectMessageMonetizationSchema = SchemaFactory.createForClass(
  DirectMessageMonetization,
);

export { DirectMessageMonetizationSchema };
