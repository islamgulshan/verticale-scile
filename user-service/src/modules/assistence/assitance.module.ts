import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { PetitionModule } from './petition/petition.module';
import { ReportMessagesModule } from './report-messages/report-messages.module';

@Module({
  imports: [ReportModule, PetitionModule, ReportMessagesModule],
})
export class AssistanceModule {}
