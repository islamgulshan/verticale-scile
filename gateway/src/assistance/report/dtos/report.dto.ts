import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ReportType } from '../../../constants/common';

export class AssistanceReportDto {
  @ApiProperty({
    description: `report a problem`,
    enum: ReportType,
    example: ReportType.ACCOUNT_MONETIZATION,
    required: true,
  })
  @IsEnum(ReportType, {
    message: `report_type must be a valid ReportType enum: ${Object.values(
      ReportType,
    ).join(' or ')}`,
  })
  @IsOptional()
  report_type: ReportType;
  @ApiProperty({
    description: 'report reason',
    example: 'Payment issue',
    required: true,
  })
  @IsString()
  report_reason: string;
}
