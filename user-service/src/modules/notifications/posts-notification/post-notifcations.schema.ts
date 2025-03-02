import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PostNotificationType } from 'src/config/common';

@Schema({ timestamps: true })
export class PostsNotifaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    post_notifcation: boolean
    @Prop({ enum: PostNotificationType })
    likes_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    likes_tagged_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    comments_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    comments_tagged_content: PostNotificationType
    @Prop({ default: false })
    replies_comment: boolean
    @Prop({ enum: PostNotificationType })
    voice_comments_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    voice_comments_tagged_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    donation_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    reposted_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    reposted_tagged_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    users_buy_premium_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    users_buy_premium_tagged_content: PostNotificationType
    @Prop({ enum: PostNotificationType })
    users_tagged_18_content: PostNotificationType


}

export const PostsNotifactionSchema = SchemaFactory.createForClass(PostsNotifaction);
