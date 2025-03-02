import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class InboxNotifaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    subscribers_messages: boolean
    @Prop({ default: false })
    users_messages: boolean
    @Prop({ default: false })
    every_one_messages: boolean
    @Prop({ default: false })
    direct_message: boolean
    @Prop({ default: false })
    group_joined: boolean
    @Prop({ default: false })
    invitation_group_joined: boolean
    @Prop({ default: false })
    donation_group: boolean
    @Prop({ default: false })
    buy_premium_content: boolean

}

export const InboxNotifactionSchema = SchemaFactory.createForClass(InboxNotifaction);
