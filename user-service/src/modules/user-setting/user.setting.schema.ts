import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ReferralActionEnum, UserRole } from '../../constants/common';
export type UserSettingDocument = UserSetting & Document;

class UserBenefit {
  @Prop({ type: String, required: true })
  header: string;

  @Prop({ type: String, required: true })
  desc: string;
}

@Schema({
  timestamps: true,
})
export class UserSetting {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user_id: Types.ObjectId;

  @Prop({
    type: String,
    enum: UserRole,
  })
  role: UserRole;

  @Prop({
    type: {
      action: { type: String, enum: ReferralActionEnum },
      discount_percent: { type: Number },
      referral_code: { type: String },
      custom: { type: Boolean, default: false },
    },
  })
  referral: {
    action: ReferralActionEnum;
    discount_percent: number;
    referral_code: string;
    custom: boolean;
  };

  @Prop({
    type: {
      user_benefit: [
        {
          amount: { type: Number },
          description: { type: String },
        },
      ],
      amount: { type: Number },
      under_eighteen: { type: Boolean, default: false },
      content_type: { type: String },
      content_description: { type: String },
      driving_license: { type: String },
    },
    default: {},
  })
  monetization: {
    user_benefit: UserBenefit[];
    amount: number;
    under_eighteen: boolean;
    content_type: string;
    content_description: string;
    driving_license: string;
  };

  @Prop({ type: String })
  redeem_code: string;
}

const UserSettingSchema = SchemaFactory.createForClass(UserSetting);

export { UserSettingSchema };
