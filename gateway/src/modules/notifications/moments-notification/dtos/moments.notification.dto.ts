import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { MomentNotificationType } from '../../../../constants/common';
export class MomentsNotifactionDto {
  @ApiProperty({ description: 'subscription notifications', example: true })
  @IsBoolean()
  @IsOptional()
  from_subscription: boolean;
  @ApiProperty({ description: 'connected user notifications', example: false })
  @IsBoolean()
  @IsOptional()
  from_connected_user: boolean;
  @ApiProperty({
    description: 'Receive notifications when a moment is liked',
    enum: MomentNotificationType,
  })
  @IsEnum(MomentNotificationType)
  @IsOptional()
  moment_liked: MomentNotificationType;
  @ApiProperty({
    description: 'Receive notifications for moment donations',
    enum: MomentNotificationType,
  })
  @IsEnum(MomentNotificationType)
  @IsOptional()
  donation_moment: MomentNotificationType;
  @ApiProperty({
    description: 'Receive notifications when tagged in a moment',
    enum: MomentNotificationType,
  })
  @IsEnum(MomentNotificationType)
  @IsOptional()
  tagged_moment: MomentNotificationType;
  @ApiProperty({
    description: 'Receive notifications when tagged in an 18+ moment',
    enum: MomentNotificationType,
  })
  @IsEnum(MomentNotificationType)
  @IsOptional()
  tagged_18_moment: MomentNotificationType;
  @ApiProperty({
    description: 'Receive notifications for moment partnerships',
    enum: MomentNotificationType,
  })
  @IsEnum(MomentNotificationType)
  @IsOptional()
  partnership: MomentNotificationType;
}
