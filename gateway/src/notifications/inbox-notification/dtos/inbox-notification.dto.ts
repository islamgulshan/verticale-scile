import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class InboxNotificationDto {
    @ApiProperty({ description: "Receive notifications for subscriber messages", default: false })
    @IsBoolean()
    subscribers_messages: boolean;

    @ApiProperty({ description: "Receive notifications for user messages", default: false })
    @IsBoolean()
    users_messages: boolean;

    @ApiProperty({ description: "Receive notifications for messages from everyone", default: false })
    @IsBoolean()
    every_one_messages: boolean;

    @ApiProperty({ description: "Receive notifications for direct messages", default: false })
    @IsBoolean()
    direct_message: boolean;

    @ApiProperty({ description: "Receive notifications when joining a group", default: false })
    @IsBoolean()
    group_joined: boolean;

    @ApiProperty({ description: "Receive notifications for group invitations", default: false })
    @IsBoolean()
    invitation_group_joined: boolean;

    @ApiProperty({ description: "Receive notifications for group donations", default: false })
    @IsBoolean()
    donation_group: boolean;

    @ApiProperty({ description: "Receive notifications for purchasing premium content", default: false })
    @IsBoolean()
    buy_premium_content: boolean;
}
