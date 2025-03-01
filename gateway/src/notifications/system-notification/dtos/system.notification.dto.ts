import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SystemNotifactionDto {
  @ApiProperty({ description: 'Software update notifications', example: true })
  @IsBoolean()
  software_update: boolean;

  @ApiProperty({ description: 'Bug fix notifications', example: false })
  @IsBoolean()
  bug_fixes: boolean;

  @ApiProperty({ description: 'New feature notifications', example: true })
  @IsBoolean()
  new_features: boolean;

  @ApiProperty({ description: 'Terms and conditions update notifications', example: false })
  @IsBoolean()
  update_term_condition: boolean;

  @ApiProperty({ description: 'Event invitation notifications', example: false })
  @IsBoolean()
  event_invitation: boolean;

  @ApiProperty({ description: 'Performance tips notifications', example: false })
  @IsBoolean()
  performance_tips: boolean;
}
