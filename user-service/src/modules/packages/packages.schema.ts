import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Packages extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  sub_title: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: [String] })
  features: string[];
}

export const PackagesSchema = SchemaFactory.createForClass(Packages);
