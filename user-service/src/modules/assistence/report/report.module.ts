import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AssistenceReport, AssistenceReportSchema } from './report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AssistenceReport.name,
        schema: AssistenceReportSchema,
      },
    ]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
