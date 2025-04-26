import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { boolean } from 'joi';
import { Document, Types } from 'mongoose';
import { PostRelationType } from 'src/common';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: [String], required: true })
  attachments: string[];

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  tags: Types.ObjectId[];

  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  created_by: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  content_about: string[];

  @Prop({ enum: PostRelationType })
  content_relation: PostRelationType;

  @Prop({ type: Boolean })
  audience_eighteen_plus: boolean;
  @Prop()
  content_warning: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
