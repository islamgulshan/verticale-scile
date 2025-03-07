import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ContentWarning } from 'src/config/common';

@Schema({ timestamps: true })
export class LiveSettingMonetization extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  display_earning_number: boolean;
  @Prop({ type: Boolean, default: true })
  display_earning: boolean;
  @Prop({ type: Boolean, required: true })
  allow_flash_light: boolean;

  @Prop({ type: [String] })
  roles: string[];

  @Prop({ type: String })
  background_music: string;

  @Prop({ type: String })
  voice_mode: string;

  @Prop({ type: Boolean, default: true })
  under_eighten: boolean;

  @Prop({ type: Boolean, default: true })
  eighten_plus: boolean;

  @Prop({ enum: ContentWarning })
  content_warning: ContentWarning;
}

const LiveSettingMonetizationSchema = SchemaFactory.createForClass(
  LiveSettingMonetization,
);

export { LiveSettingMonetizationSchema };
