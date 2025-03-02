import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PicksNotifaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    user_changing_position: boolean
    @Prop({ default: false })
    vote_remaining_time: boolean
    @Prop({ default: false })
    users_picking_you: boolean
    @Prop({ default: false })
    users_you_picked_winning_creator: boolean
    @Prop({ default: false })
    you_winning_creator: boolean
}

export const PicksNotifactionSchema = SchemaFactory.createForClass(PicksNotifaction);
