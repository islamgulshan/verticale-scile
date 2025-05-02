import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Season extends Document {
  @Prop({ required: true })
  name: string;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
