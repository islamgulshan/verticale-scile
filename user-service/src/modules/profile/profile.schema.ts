import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  profile_pictures_list: string[];

  @Prop({ type: String,default: null })
  profile_picture: string;

  @Prop({ type: [String], default: [] })
  cover_pictures_list: string[];

  @Prop({ type: String, default: null })
  cover_picture: string;

  @Prop({ type: String, default: null })
  location: string;

  @Prop({ type: String, default: null })
  name: string;

  @Prop({ type: String, default: null })
  user_name: string;

  @Prop({ type: String, default: null })
  bio: string;

  @Prop({ type: Number, default: 0 })
  verification_level: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
