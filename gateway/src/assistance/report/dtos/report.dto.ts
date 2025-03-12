import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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

export class CreateReportAccountRecoveryDto {
  @ApiProperty({ example: 'JohnDoe', description: 'Username of the reporter' })
  @IsString()
  @IsOptional()
  user_name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
  @IsEmail()
  @IsOptional()
  user_email: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number' })
  @IsString()
  @IsOptional()
  phone_number: string;

  @ApiProperty({
    example: 'I have an issue...',
    description: 'User message or complaint',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
