import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Connection extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  connection_List: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  connection_pending_List: Types.ObjectId[];
}

const ConnectionSchema = SchemaFactory.createForClass(Connection);

export { ConnectionSchema };
