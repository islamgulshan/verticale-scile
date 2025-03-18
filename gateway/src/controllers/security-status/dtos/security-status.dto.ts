import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SecurityStatusDto {
  @ApiProperty({
    type: Boolean,
    description: 'enable_security_notification',
    default: false,
  })
  @IsBoolean()
  enable_security_notification: boolean;
}
