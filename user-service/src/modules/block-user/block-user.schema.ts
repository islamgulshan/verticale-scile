import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BlockUser extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  block_list: Types.ObjectId[];
}

const BlockUserSchema = SchemaFactory.createForClass(BlockUser);

export { BlockUserSchema };
