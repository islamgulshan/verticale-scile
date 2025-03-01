import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RelationsNotifaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    connection_request_send: boolean
    @Prop({ default: false })
    connection_request_received: boolean
    @Prop({ default: false })
    user_account_subscription: boolean
    @Prop({ default: false })
    monthly_subscription: boolean
}

export const RelationsNotifactionSchema = SchemaFactory.createForClass(RelationsNotifaction);
