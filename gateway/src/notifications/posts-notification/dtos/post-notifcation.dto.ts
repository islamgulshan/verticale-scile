import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { PostNotificationType } from '../../../constants/common';

export class PostNotificationDto {
    @ApiProperty({ description: "Receive notifications for new posts", default: false })
    @IsBoolean()
    post_notifcation: boolean;

    @ApiProperty({ description: "Receive notifications when content is liked", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    likes_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when tagged content is liked", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    likes_tagged_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when content is commented on", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    comments_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when tagged content is commented on", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    comments_tagged_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications for replies to comments", default: false })
    @IsBoolean()
    replies_comment: boolean;

    @ApiProperty({ description: "Receive notifications for voice comments on content", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    voice_comments_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications for voice comments on tagged content", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    voice_comments_tagged_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications for content donations", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    donation_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when content is reposted", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    reposted_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when tagged content is reposted", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    reposted_tagged_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when users buy premium content", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    users_buy_premium_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when users buy premium tagged content", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    users_buy_premium_tagged_content: PostNotificationType;

    @ApiProperty({ description: "Receive notifications when users are tagged in 18+ content", enum: PostNotificationType })
    @IsEnum(PostNotificationType)
    users_tagged_18_content: PostNotificationType;
}
