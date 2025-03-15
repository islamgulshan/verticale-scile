import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { WhoCanCommentYou } from '../../../../constants';

export class CommentMonetizationDto {
  @ApiProperty({
    description: 'Enable or disable charging for voice comments',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  charge_voice_comment: boolean;

  @ApiProperty({
    description: 'Amount to be charged for a voice comment',
    example: 5,
    required: false, // Optional field
  })
  @IsOptional()
  @IsNumber()
  amount_charge_voice_comment?: number;

  @ApiProperty({
    description: 'Who can comment on your voice messages',
    enum: WhoCanCommentYou,
    example: WhoCanCommentYou.EVERY_ONE,
  })
  @IsEnum(WhoCanCommentYou, {
    message: `who_can_direct_message must be a valid ShowPrivacyConetntType enum: ${Object.values(
      WhoCanCommentYou,
    ).join(' or ')}`,
  })
  @IsOptional()
  who_can_comment: WhoCanCommentYou;
}
