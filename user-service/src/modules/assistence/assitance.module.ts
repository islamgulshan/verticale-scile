import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { PetitionModule } from './petition/petition.module';

@Module({
  imports: [ReportModule, PetitionModule],
})
export class AssistanceModule {}
