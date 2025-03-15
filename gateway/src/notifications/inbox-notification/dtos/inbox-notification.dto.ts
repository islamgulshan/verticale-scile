import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class InboxNotificationDto {
  @ApiProperty({
    description: 'Receive notifications for subscriber messages',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  subscribers_messages: boolean;

  @ApiProperty({
    description: 'Receive notifications for user messages',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  users_messages: boolean;

  @ApiProperty({
    description: 'Receive notifications for messages from everyone',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  every_one_messages: boolean;

  @ApiProperty({
    description: 'Receive notifications for direct messages',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  direct_message: boolean;

  @ApiProperty({
    description: 'Receive notifications when joining a group',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  group_joined: boolean;

  @ApiProperty({
    description: 'Receive notifications for group invitations',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  invitation_group_joined: boolean;

  @ApiProperty({
    description: 'Receive notifications for group donations',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  donation_group: boolean;

  @ApiProperty({
    description: 'Receive notifications for purchasing premium content',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  buy_premium_content: boolean;
}
