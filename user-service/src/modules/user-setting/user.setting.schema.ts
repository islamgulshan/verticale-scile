import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ReferralActionEnum, UserRole } from '../../constants/common';
export type UserSettingDocument = UserSetting & Document;

class UserBenefit {
  @Prop({ type: String, default: "" })
  header: string;

  @Prop({ type: String, default: "" })
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
    default:UserRole.CONTENT_CREATOR
  })
  role: UserRole;

  @Prop({
    type: {
      action: { type: String, enum: ReferralActionEnum,default:ReferralActionEnum.GENERATE_CODE},
      discount_percent: { type: Number,default:0 },
      referral_code: { type: String ,default:""},
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
          amount: { type: Number,default:0 },
          description: { type: String ,default:""},
        },
      ],
      amount: { type: Number ,default:0},
      under_eighteen: { type: Boolean, default: false },
      content_type: { type: String,default:ReferralActionEnum.GENERATE_CODE },
      content_description: { type: String,default:"" },
      driving_license: { type: String,default:"" },
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

  @Prop({ type: String,default:"" })
  redeem_code: string;
}

const UserSettingSchema = SchemaFactory.createForClass(UserSetting);

export { UserSettingSchema };
