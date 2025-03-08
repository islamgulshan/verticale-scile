import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AssistencePetition extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: Types.ObjectId;

  @Prop({ type: String, required: true })
  about: string;

  @Prop({ type: String, required: true })
  topic: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  story: string;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  supporters: Types.ObjectId[];
}

const AssistencePetitionSchema =
  SchemaFactory.createForClass(AssistencePetition);

export { AssistencePetitionSchema };
