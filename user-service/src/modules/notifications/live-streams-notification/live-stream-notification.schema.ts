import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { InvitationRoomLiveType } from 'src/config/common';

@Schema({ timestamps: true })
export class LiveStreamsNotifaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    subscription_going_live: boolean
    @Prop({ default: false })
    users_going_live: boolean
    @Prop({ default: false })
    trending_content_creator: boolean
    @Prop({ default: false })
    subscription_trending_content_creator: boolean
    @Prop({ default: false })
    users_trending_content_creator: boolean
    @Prop({ default: false })
    dark_room_trending: boolean
    @Prop({ default: false })
    subscription_start_dark_room: boolean
    @Prop({ default: false })
    users_start_dark_room: boolean
    @Prop({ enum: InvitationRoomLiveType, default: InvitationRoomLiveType.PEOPLE_YOU_CONNECT })
    invitation_join_dark_room: InvitationRoomLiveType
    @Prop({ enum: InvitationRoomLiveType, default: InvitationRoomLiveType.PEOPLE_YOU_CONNECT })
    invitation_join_live: InvitationRoomLiveType
    @Prop({ enum: InvitationRoomLiveType, default: InvitationRoomLiveType.PEOPLE_YOU_CONNECT })
    invitation_join_live_dark_room_18: InvitationRoomLiveType
}

export const LiveStreamsNotifactionSchema = SchemaFactory.createForClass(LiveStreamsNotifaction);
