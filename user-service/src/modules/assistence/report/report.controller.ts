import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportService } from './report.service';
import { AssistenceReport } from './report.schema';
import { ReportAssistanceDto } from './dtos/dtos';
import { AssistenceAccountRecovery } from './report-account-recovery';
import { PaginatedResponseDto } from 'src/constants/common';

@Controller('report')
export class ReportController {
  constructor(private readonly assistanceReportService: ReportService) {}
  @MessagePattern('create-assistance-report')
  async create(
    @Payload() dto: Partial<AssistenceReport>,
  ): Promise<AssistenceReport> {
    return this.assistanceReportService.create(dto);
  }
  @MessagePattern('get-assistance-report')
  async getList(
    @Payload() payload?: ReportAssistanceDto,
  ): Promise<PaginatedResponseDto> {
    return this.assistanceReportService.getList(payload);
  }

  @MessagePattern('get-assistance-report-by-id')
  async getById(
    @Payload() id: Partial<AssistenceReport>,
  ): Promise<AssistenceReport> {
    return this.assistanceReportService.getById(id);
  }

  @MessagePattern('delete-assistance-report')
  async delete(
    @Payload() id: Partial<AssistenceReport>,
  ): Promise<AssistenceReport> {
    return this.assistanceReportService.delete(id);
  }
  @MessagePattern('create-account-recovery-report')
  async accountRecoveryReport(
    @Payload() dto: Partial<AssistenceAccountRecovery>,
  ): Promise<AssistenceAccountRecovery> {
    return this.assistanceReportService.accountRecoveryReport(dto);
  }
  @MessagePattern('get-account-recovery-reports')
  async getAccountRecoveryReports(
    @Payload() payload?: ReportAssistanceDto,
  ): Promise<PaginatedResponseDto> {
    return this.assistanceReportService.getAccountRecoveryReports(payload);
  }
}
