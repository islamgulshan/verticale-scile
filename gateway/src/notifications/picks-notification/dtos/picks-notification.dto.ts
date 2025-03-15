import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
export class PicksNotificationDto {
  @ApiProperty({
    description: 'Receive notifications when a user changes position',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  user_changing_position: boolean;

  @ApiProperty({
    description: 'Receive notifications when the vote remaining time is low',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  vote_remaining_time: boolean;

  @ApiProperty({
    description: 'Receive notifications when users are picking you in a vote',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  users_picking_you: boolean;

  @ApiProperty({
    description:
      'Receive notifications when users you picked are winning as creators',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  users_you_picked_winning_creator: boolean;

  @ApiProperty({
    description: 'Receive notifications when you are winning as a creator',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  you_winning_creator: boolean;
}
