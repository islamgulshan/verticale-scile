import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { MomentNotificationType } from '../../../constants/common';
export class MomentsNotifactionDto {
    @ApiProperty({ description: 'subscription notifications', example: true })
    @IsBoolean()
    from_subscription: boolean;
    @ApiProperty({ description: 'connected user notifications', example: false })
    @IsBoolean()
    from_connected_user: boolean;
    @ApiProperty({ description: "Receive notifications when a moment is liked", enum: MomentNotificationType })
    @IsEnum(MomentNotificationType)
    moment_liked: MomentNotificationType;
    @ApiProperty({ description: "Receive notifications for moment donations", enum: MomentNotificationType })
    @IsEnum(MomentNotificationType)
    donation_moment: MomentNotificationType;
    @ApiProperty({ description: "Receive notifications when tagged in a moment", enum: MomentNotificationType })
    @IsEnum(MomentNotificationType)
    tagged_moment: MomentNotificationType;
    @ApiProperty({ description: "Receive notifications when tagged in an 18+ moment", enum: MomentNotificationType })
    @IsEnum(MomentNotificationType)
    tagged_18_moment: MomentNotificationType;
    @ApiProperty({ description: "Receive notifications for moment partnerships", enum: MomentNotificationType })
    @IsEnum(MomentNotificationType)
    partnership: MomentNotificationType;

}
