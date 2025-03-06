import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AccountMonetization extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Boolean })
  enable_account_monetization: boolean;
  @Prop({
    type: [
      {
        header: { type: String },
        desc: { type: String },
      },
    ],
    default: [],
  })
  user_benefit: { header: string; desc: string }[];

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Boolean })
  for_under_eighteen: boolean;

  @Prop({ type: Boolean })
  not_for_under_eighteen: boolean;

  @Prop({ type: String })
  content_type: string;

  @Prop({ type: String })
  content_description: string;

  @Prop({ type: String })
  driving_license: string;
}

const AccountMonetizationSchema =
  SchemaFactory.createForClass(AccountMonetization);

export { AccountMonetizationSchema };
