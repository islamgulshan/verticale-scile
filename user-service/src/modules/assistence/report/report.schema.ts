import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ReportType } from 'src/config/common';

@Schema({ timestamps: true })
export class AssistenceReport extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ enum: ReportType, required: true })
  report_type: ReportType;

  @Prop({ type: String, required: true })
  report_reason: string;
}

const AssistenceReportSchema = SchemaFactory.createForClass(AssistenceReport);

export { AssistenceReportSchema };
