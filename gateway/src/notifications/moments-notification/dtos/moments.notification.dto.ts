import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
export class MomentsNotifactionDto {
    @ApiProperty({ description: 'subscription notifications', example: true })
    @IsBoolean()
    from_subscription: boolean;
    @ApiProperty({ description: 'connected user notifications', example: false })
    @IsBoolean()
    from_connected_user: boolean;
}
