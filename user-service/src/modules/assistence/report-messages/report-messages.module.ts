import { Module } from '@nestjs/common';
import { ReportMessagesService } from './report-messages.service';
import { ReportMessagesController } from './report-messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportMessages, ReportMessagesSchema } from './report-messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReportMessages.name,
        schema: ReportMessagesSchema,
      },
    ]),
  ],
  providers: [ReportMessagesService],
  controllers: [ReportMessagesController],
  exports: [ReportMessagesService],
})
export class ReportMessagesModule {}
