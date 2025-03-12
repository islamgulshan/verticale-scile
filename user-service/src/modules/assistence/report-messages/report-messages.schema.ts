import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ReportMessages extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: String })
  message: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  message_sender: Types.ObjectId;
}

const ReportMessagesSchema = SchemaFactory.createForClass(ReportMessages);

export { ReportMessagesSchema };
