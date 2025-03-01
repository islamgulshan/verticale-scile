import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class MomentsNotifaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    from_connected_user: boolean
    @Prop({ default: false })
    from_subscription: boolean
}

export const MomentsNotifactionSchema = SchemaFactory.createForClass(MomentsNotifaction);
