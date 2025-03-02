import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CommunitiesNotificationDto {

    @ApiProperty({ description: "Receive notifications when a request to join a community is made", default: false })
    @IsBoolean()
    request_join_community: boolean;

    @ApiProperty({ description: "Receive notifications when users join a community", default: false })
    @IsBoolean()
    users_join_community: boolean;

    @ApiProperty({ description: "Receive notifications when someone is requesting to join a community", default: false })
    @IsBoolean()
    requesting_join_community: boolean;

    @ApiProperty({ description: "Receive notifications for likes on community posts", default: false })
    @IsBoolean()
    likes_community: boolean;

    @ApiProperty({ description: "Receive notifications for community donations", default: false })
    @IsBoolean()
    donation_community: boolean;

    @ApiProperty({ description: "Receive notifications when a community is deleted", default: false })
    @IsBoolean()
    delete_community: boolean;

    @ApiProperty({ description: "Receive notifications for write requests in a community", default: false })
    @IsBoolean()
    write_request_community: boolean;
}
