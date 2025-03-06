import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WhoCanCommentYou, WhoCanMessageYou } from 'src/config/common';

@Schema({ timestamps: true })
export class CommentMonetization extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  charge_voice_comment: boolean;

  @Prop({ type: Number })
  amount_charge_voice_comment: number;

  @Prop({ enum: WhoCanCommentYou, default: WhoCanCommentYou.EVERY_ONE })
  who_can_comment: WhoCanCommentYou;
}

const CommentMonetizationSchema =
  SchemaFactory.createForClass(CommentMonetization);

export { CommentMonetizationSchema };
