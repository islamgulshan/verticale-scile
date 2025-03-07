import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportService } from './report.service';
import { AssistenceReport } from './report.schema';
import { ReportAssistanceDto } from './dtos/dtos';

@Controller('report')
export class ReportController {
  constructor(private readonly assistanceReportService: ReportService) {}
  @MessagePattern('create-assistance-report')
  create(@Payload() dto: Partial<AssistenceReport>) {
    return this.assistanceReportService.create(dto);
  }
  @MessagePattern('get-assistance-report')
  getList(@Payload() payload?: ReportAssistanceDto) {
    return this.assistanceReportService.getList(payload);
  }

  @MessagePattern('get-assistance-report-by-id')
  getById(@Payload() id: Partial<AssistenceReport>) {
    return this.assistanceReportService.getById(id);
  }

  @MessagePattern('delete-assistance-report')
  delete(@Payload() id: Partial<AssistenceReport>) {
    return this.assistanceReportService.delete(id);
  }
}
