import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { PostNotificationType } from 'src/constants/common';

@Schema({ timestamps: true })
export class PostsNotifaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: ObjectId;
  @Prop({ default: false })
  post_notifcation: boolean;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  likes_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  likes_tagged_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  comments_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  comments_tagged_content: PostNotificationType;
  @Prop({ default: false })
  replies_comment: boolean;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  voice_comments_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  voice_comments_tagged_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  donation_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  reposted_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  reposted_tagged_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  users_buy_premium_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  users_buy_premium_tagged_content: PostNotificationType;
  @Prop({ enum: PostNotificationType, default: PostNotificationType.EVERY_ONE })
  users_tagged_18_content: PostNotificationType;
}

export const PostsNotifactionSchema =
  SchemaFactory.createForClass(PostsNotifaction);
