import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  PrivacyContentType,
  PrivacyRelationType,
  ShowPrivacyConetntType,
  WhoCanBeLimited,
  WhoCanYouLimit,
} from '../../constants/common';

export class PrivacyContentDto {
  @ApiProperty({
    enum: ShowPrivacyConetntType,
    description: 'Controls who can see the content',
    default: ShowPrivacyConetntType.WHOLE_WORLD,
  })
  @IsOptional()
  //   @IsEnum(ShowPrivacyConetntType)
  @IsEnum(ShowPrivacyConetntType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      ShowPrivacyConetntType,
    ).join(' or ')}`,
  })
  show_content: ShowPrivacyConetntType;

  @ApiProperty({
    enum: PrivacyContentType,
    description: 'Controls who can tag the user',
    default: PrivacyContentType.EVERY_ONE,
  })
  @IsEnum(PrivacyContentType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyContentType,
    ).join(' or ')}`,
  })
  @IsOptional()
  tag_you: PrivacyContentType;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if content viewing is enabled',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  content_view: boolean;

  @ApiProperty({
    enum: PrivacyContentType,
    description: 'Controls who can comment on content',
    default: PrivacyContentType.EVERY_ONE,
  })
  @IsEnum(PrivacyContentType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyContentType,
    ).join(' or ')}`,
  })
  @IsOptional()
  comment_on_content: PrivacyContentType;

  @ApiProperty({
    enum: PrivacyContentType,
    description: 'Controls who can share the content',
    default: PrivacyContentType.EVERY_ONE,
  })
  @IsEnum(PrivacyContentType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyContentType,
    ).join(' or ')}`,
  })
  @IsOptional()
  share_content: PrivacyContentType;

  @ApiProperty({
    enum: PrivacyContentType,
    description: 'Controls who can remix the content',
    default: PrivacyContentType.EVERY_ONE,
  })
  @IsEnum(PrivacyContentType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyContentType,
    ).join(' or ')}`,
  })
  @IsOptional()
  remix_content: PrivacyContentType;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if limiting content is enabled',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  enable_limit: boolean;

  @ApiProperty({
    enum: WhoCanYouLimit,
    description: 'Specifies what can be limited for the user',
    default: WhoCanYouLimit.ACCOUNT_CHAT,
  })
  @IsOptional()
  @IsEnum(WhoCanYouLimit, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      WhoCanYouLimit,
    ).join(' or ')}`,
  })
  @IsOptional()
  @IsString()
  what_can_you_limit?: WhoCanYouLimit;

  @ApiProperty({
    enum: WhoCanBeLimited,
    description: 'Specifies what can be limited for the user',
    default: WhoCanBeLimited.ACCOUNT_NOT_CONN_SUBS,
  })
  @IsEnum(WhoCanBeLimited, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      WhoCanBeLimited,
    ).join(' or ')}`,
  })
  @IsOptional()
  @IsString()
  what_can_be_limited?: WhoCanBeLimited;

  @ApiProperty({
    enum: PrivacyContentType,
    description: 'Controls who can reply to moments',
    default: PrivacyContentType.EVERY_ONE,
  })
  @IsEnum(PrivacyContentType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyContentType,
    ).join(' or ')}`,
  })
  @IsOptional()
  reply_moments: PrivacyContentType;

  @ApiProperty({
    enum: PrivacyContentType,
    description: 'Controls who can share moments',
    default: PrivacyContentType.EVERY_ONE,
  })
  @IsOptional()
  @IsEnum(PrivacyContentType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyContentType,
    ).join(' or ')}`,
  })
  @IsOptional()
  share_moments: PrivacyContentType;

  @ApiProperty({
    enum: PrivacyRelationType,
    description: 'Defines privacy settings based on relationships',
    default: PrivacyRelationType.EVERY_ONE,
  })
  @IsEnum(PrivacyRelationType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyRelationType,
    ).join(' or ')}`,
  })
  @IsOptional()
  privacy_relation: PrivacyRelationType;

  @ApiProperty({
    enum: PrivacyContentType,
    description: 'Controls who can mention the user',
    default: PrivacyContentType.EVERY_ONE,
  })
  @IsEnum(PrivacyContentType, {
    message: `show_content must be a valid ShowPrivacyConetntType enum: ${Object.values(
      PrivacyContentType,
    ).join(' or ')}`,
  })
  @IsOptional()
  privacy_mention: PrivacyContentType;
}
