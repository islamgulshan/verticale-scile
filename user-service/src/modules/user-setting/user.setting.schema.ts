
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {ReferralActionEnum, UserRole} from "../../config/common/constant"
export type UserSettingDocument = UserSetting & Document;

class UserBenefit {
    @Prop({ type: String, required: true })
    header: string;

    @Prop({ type: String, required: true })
    desc: string;
}

@Schema({
    timestamps: true
})
export class UserSetting {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    user_id: Types.ObjectId;

    @Prop({
        type: String,
        enum: UserRole,
        required: true,
      })
      role: UserRole;

    @Prop({
        type: {
            action: { type: String, enum: ReferralActionEnum, required: true },
            discount_percent: { type: Number },
            referral_code: { type: String, required: true },
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
                    amount: { type: Number, required: true },
                    description: { type: String, required: true },
                },
            ],
            amount: { type: Number, required: true },
            under_eighteen: { type: Boolean, default: false },
            content_type: { type: String, required: true },
            content_description: { type: String, required: true },
            driving_license: { type: String, required: true },
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
