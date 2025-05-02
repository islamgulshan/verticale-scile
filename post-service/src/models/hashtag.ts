import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class HashTag extends Document {
  @Prop({ required: true })
  hash_tag: string;
}

export const HashTagSchema = SchemaFactory.createForClass(HashTag);
