import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  PrivacyContentType,
  PrivacyRelationType,
  ShowPrivacyConetntType,
  WhoCanBeLimited,
  WhoCanYouLimit,
} from 'src/constants/common';

@Schema({ timestamps: true })
export class PrivacyContent extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({
    enum: ShowPrivacyConetntType,
    default: ShowPrivacyConetntType.WHOLE_WORLD,
  })
  show_content: ShowPrivacyConetntType;
  @Prop({ enum: PrivacyContentType, default: PrivacyContentType.EVERY_ONE })
  tag_you: PrivacyContentType;
  @Prop({ type: Boolean, default: false })
  content_view: boolean;
  @Prop({ enum: PrivacyContentType, default: PrivacyContentType.EVERY_ONE })
  comment_on_content: PrivacyContentType;
  @Prop({ enum: PrivacyContentType, default: PrivacyContentType.EVERY_ONE })
  share_content: PrivacyContentType;
  @Prop({ enum: PrivacyContentType, default: PrivacyContentType.EVERY_ONE })
  remix_content: PrivacyContentType;
  @Prop({ type: Boolean, default: false })
  enable_limit: boolean;
  @Prop({ enum: WhoCanYouLimit, default: WhoCanYouLimit.ACCOUNT_CHAT })
  what_can_you_limit: WhoCanYouLimit;
  @Prop({
    enum: WhoCanBeLimited,
    default: WhoCanBeLimited.ACCOUNT_NOT_CONN_SUBS,
  })
  what_can_be_limited: WhoCanBeLimited;
  @Prop({ enum: PrivacyContentType, default: PrivacyContentType.EVERY_ONE })
  reply_moments: PrivacyContentType;
  @Prop({ enum: PrivacyContentType, default: PrivacyContentType.EVERY_ONE })
  share_moments: PrivacyContentType;
  @Prop({ enum: PrivacyRelationType, default: PrivacyRelationType.EVERY_ONE })
  privacy_relation: PrivacyRelationType;
  @Prop({ enum: PrivacyContentType, default: PrivacyContentType.EVERY_ONE })
  privacy_mention: PrivacyContentType;
  @Prop([
    {
      desc: { type: String },
      amount: { type: Number },
    },
  ])
  relation_subscription: { desc: string; amount: number }[];
  @Prop({ type: Boolean, default: false })
  enable_relation_connection_req: boolean;
}

export const PrivacyContentSchema =
  SchemaFactory.createForClass(PrivacyContent);
