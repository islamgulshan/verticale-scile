import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AssistenceAccountRecovery extends Document {
  @Prop({ type: String })
  user_name: string;

  @Prop({ type: String })
  user_email: string;

  @Prop({ type: String })
  phone_number: string;
  @Prop({ type: String })
  message: string;
}

const AssistenceAccountRecoverySchema = SchemaFactory.createForClass(
  AssistenceAccountRecovery,
);

export { AssistenceAccountRecoverySchema };
