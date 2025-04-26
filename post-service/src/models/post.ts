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

  @Prop({ type: [String] })
  hashtags: string[];

  @Prop({ type: Boolean, default: false })
  allow_comment: boolean;

  @Prop({ type: Boolean, default: false })
  allow_voice_comment: boolean;

  @Prop({ type: Number })
  pay_for_comment: number;

  @Prop({ type: Number })
  pay_for_voice_comment: number;

  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  season: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  is_premium_monetisation: boolean;

  @Prop({ type: Number })
  amount_premium_monetisation: number;

  @Prop({ type: Boolean, default: false })
  custom_amount_premium_monetisation: boolean;

  @Prop()
  thumbnail: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
