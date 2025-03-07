import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WhoCanMessageYou } from 'src/config/common';

@Schema({ timestamps: true })
export class SeasonsMonetization extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  season_name: string;

  @Prop({ type: Number, required: true })
  number_of_content: number;

  @Prop({ type: Boolean, default: false })
  premium_monetization: boolean;

  @Prop({ type: Number, required: true })
  season_amount: number;
}

const SeasonsMonetizationSchema =
  SchemaFactory.createForClass(SeasonsMonetization);

export { SeasonsMonetizationSchema };
