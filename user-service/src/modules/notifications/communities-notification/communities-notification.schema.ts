import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class CommunitiesNotifaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    request_join_community: boolean
    @Prop({ default: false })
    users_join_community: boolean
    @Prop({ default: false })
    requesting_join_community: boolean
    @Prop({ default: false })
    likes_community: boolean
    @Prop({ default: false })
    donation_community: boolean
    @Prop({ default: false })
    delete_community: boolean
    @Prop({ default: false })
    write_request_community: boolean
}

export const CommunitiesNotifactionSchema = SchemaFactory.createForClass(CommunitiesNotifaction);
