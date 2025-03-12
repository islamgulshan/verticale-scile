import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, isString, IsString } from 'class-validator';

export class ReportMessagesDto {
  @ApiProperty({
    description: 'user message',
    example: 'user message',
    required: true,
  })
  @IsString()
  message: string;
}

export class AdminReportReplyDto {
  @ApiProperty({
    description: 'user_id',
    example: 'user_id',
    required: true,
  })
  @IsMongoId()
  user_id: string;

  @ApiProperty({
    description: 'user message',
    example: 'user message',
    required: true,
  })
  @IsString()
  message: string;
}
