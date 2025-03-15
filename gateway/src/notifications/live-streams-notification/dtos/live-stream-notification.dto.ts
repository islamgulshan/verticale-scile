import { ApiProperty } from '@nestjs/swagger';
import { InvitationRoomLiveType } from '../../../constants/common';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class LiveStreamsNotifactionDto {
  @ApiProperty({
    description: 'Subscription to notifications when going live',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  subscription_going_live: boolean;

  @ApiProperty({ description: 'Users going live notification', default: false })
  @IsBoolean()
  @IsOptional()
  users_going_live: boolean;

  @ApiProperty({
    description: 'Trending content creator notification',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  trending_content_creator: boolean;

  @ApiProperty({
    description: 'Subscription to trending content creator notifications',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  subscription_trending_content_creator: boolean;

  @ApiProperty({
    description: 'Users trending content creator notification',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  users_trending_content_creator: boolean;

  @ApiProperty({
    description: 'Dark room trending notification',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  dark_room_trending: boolean;

  @ApiProperty({
    description: 'Subscription start dark room notification',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  subscription_start_dark_room: boolean;

  @ApiProperty({
    description: 'Users start dark room notification',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  users_start_dark_room: boolean;

  @ApiProperty({
    description: 'Invitation to join dark room',
    enum: InvitationRoomLiveType,
    default: InvitationRoomLiveType.PEOPLE_YOU_CONNECT,
  })
  @IsEnum(InvitationRoomLiveType)
  @IsOptional()
  invitation_join_dark_room: InvitationRoomLiveType;

  @ApiProperty({
    description: 'Invitation to join live',
    enum: InvitationRoomLiveType,
    default: InvitationRoomLiveType.PEOPLE_YOU_CONNECT,
  })
  @IsEnum(InvitationRoomLiveType)
  @IsOptional()
  invitation_join_live: InvitationRoomLiveType;

  @ApiProperty({
    description: 'Invitation to join live dark room 18+',
    enum: InvitationRoomLiveType,
    default: InvitationRoomLiveType.PEOPLE_YOU_CONNECT,
  })
  @IsEnum(InvitationRoomLiveType)
  @IsOptional()
  invitation_join_live_dark_room_18: InvitationRoomLiveType;
}
