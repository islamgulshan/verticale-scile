import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { WhoCanMessageYou } from '../../../constants/common';

export class DirectMessageDto {
  @ApiProperty({
    description: 'Enable or disable charging for direct messages',
    example: false,
  })
  @IsBoolean()
  charge_direct_message: boolean;

  @ApiProperty({
    description: 'Amount to be charged for a direct message',
    example: 10,
    required: false, // Optional field
  })
  @IsOptional()
  @IsNumber()
  amount_direct_message?: number;

  @ApiProperty({
    description: 'Who can send you direct messages',
    enum: WhoCanMessageYou,
    example: WhoCanMessageYou.EVERY_ONE,
  })
  @IsEnum(WhoCanMessageYou, {
    message: `who_can_direct_message must be a valid ShowPrivacyConetntType enum: ${Object.values(
      WhoCanMessageYou,
    ).join(' or ')}`,
  })
  who_can_direct_message: WhoCanMessageYou;
}
