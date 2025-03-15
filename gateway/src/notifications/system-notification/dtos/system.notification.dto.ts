import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class SystemNotifactionDto {
  @ApiProperty({ description: 'Software update notifications', example: true })
  @IsBoolean()
  @IsOptional()
  software_update: boolean;

  @ApiProperty({ description: 'Bug fix notifications', example: false })
  @IsBoolean()
  @IsOptional()
  bug_fixes: boolean;

  @ApiProperty({ description: 'New feature notifications', example: true })
  @IsBoolean()
  @IsOptional()
  new_features: boolean;

  @ApiProperty({
    description: 'Terms and conditions update notifications',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  update_term_condition: boolean;

  @ApiProperty({
    description: 'Event invitation notifications',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  event_invitation: boolean;

  @ApiProperty({
    description: 'Performance tips notifications',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  performance_tips: boolean;
}
