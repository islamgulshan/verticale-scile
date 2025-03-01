import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SystemNotifaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ default: false })
  software_update: boolean

  @Prop({ default: false })
  bug_fixes: boolean

  @Prop({ default: false })
  new_features: boolean

  @Prop({ default: false })
  update_term_condition: boolean

  @Prop({ default: false })
  event_invitation: boolean

  @Prop({ default: false })
  performance_tips: boolean
}

export const SystemNotifactionSchema = SchemaFactory.createForClass(SystemNotifaction);
