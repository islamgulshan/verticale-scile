import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { PostNotificationType } from '../../../../constants';

export class PostNotificationDto {
  @ApiProperty({
    description: 'Receive notifications for new posts',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  post_notifcation: boolean;

  @ApiProperty({
    description: 'Receive notifications when content is liked',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  likes_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when tagged content is liked',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  likes_tagged_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when content is commented on',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  comments_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when tagged content is commented on',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  comments_tagged_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications for replies to comments',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  replies_comment: boolean;

  @ApiProperty({
    description: 'Receive notifications for voice comments on content',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  voice_comments_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications for voice comments on tagged content',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  voice_comments_tagged_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications for content donations',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  donation_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when content is reposted',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  reposted_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when tagged content is reposted',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  reposted_tagged_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when users buy premium content',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  users_buy_premium_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when users buy premium tagged content',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  users_buy_premium_tagged_content: PostNotificationType;

  @ApiProperty({
    description: 'Receive notifications when users are tagged in 18+ content',
    enum: PostNotificationType,
  })
  @IsEnum(PostNotificationType)
  @IsOptional()
  users_tagged_18_content: PostNotificationType;
}
