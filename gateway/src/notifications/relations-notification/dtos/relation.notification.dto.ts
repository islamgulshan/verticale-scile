import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class RelationNotifactionDto {
    @ApiProperty({ description: 'from connection request you send', example: true })
    @IsBoolean()
    connection_request_send: boolean;
    @ApiProperty({ description: 'from connection request send to you', example: false })
    @IsBoolean()
    connection_request_received: boolean;
    @ApiProperty({ description: 'from users subscription to your acc', example: true })
    @IsBoolean()
    user_account_subscription: boolean;
    @ApiProperty({ description: 'from monthly subscriptions', example: false })
    @IsBoolean()
    monthly_subscription: boolean;

}
