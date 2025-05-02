import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostRelationType } from '../../../constants';
import { Transform, Type } from 'class-transformer';
import { PaginationDto } from '../../../common';

export class CreatePostRequestDto {
  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'attachments (multiple files allowed)',
  })
  @IsArray()
  @IsOptional()
  attachments: string[];

  @ApiProperty({ description: 'Description of the post' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Type of post' })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    type: [String],
    description: 'Tagged users (user IDs)',
    example: ['67ba37d8f84aad4a01e1234c'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    type: [String],
    description: 'Content about',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  content_about?: string[];

  @ApiProperty({
    enum: PostRelationType,
    description: 'Content relation',
    required: false,
  })
  @IsEnum(PostRelationType)
  @IsOptional()
  content_relation?: PostRelationType;

  @ApiProperty({ description: 'Is content 18+?', required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  audience_eighteen_plus?: boolean;

  @ApiProperty({ description: 'Content warning', required: false })
  @IsString()
  @IsOptional()
  content_warning?: string;

  @ApiProperty({
    type: [String],
    description: 'List of hashtags',
    example: ['fun', 'music', 'travel'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  hashtags: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Allow text comments or not',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  allow_comment: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Allow voice comments or not',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  allow_voice_comment: boolean;

  @ApiProperty({
    type: Number,
    description: 'Amount to pay for allowing a comment',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pay_for_comment: number;

  @ApiProperty({
    type: Number,
    description: 'Amount to pay for allowing a voice comment',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pay_for_voice_comment: number;

  @ApiProperty({
    type: String,
    description: 'Season ID (User reference)',
    example: '66110fb9c0e567dd7a2f65a1',
  })
  season: string;

  @ApiProperty({
    type: Boolean,
    description: 'Enable premium monetization or not',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  is_premium_monetisation: boolean;

  @ApiProperty({
    type: Number,
    description: 'Amount for premium monetization',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  amount_premium_monetisation: number;

  @ApiProperty({
    type: Boolean,
    description: 'Allow custom premium monetization amount',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  custom_amount_premium_monetisation: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Thumbnail image file upload',
  })
  @IsOptional()
  thumbnail: string;
}

export class UpdatePostRequestDto {
  @ApiProperty({ description: 'Description of the post' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Type of post' })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    type: [String],
    description: 'Tagged users (user IDs)',
    required: false,
    example: ['67ba37d8f84aad4a01e1234c'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    type: [String],
    description: 'Content about',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  content_about?: string[];

  @ApiProperty({
    enum: PostRelationType,
    description: 'Content relation',
    required: false,
  })
  @IsEnum(PostRelationType)
  @IsOptional()
  content_relation?: PostRelationType;

  @ApiProperty({ description: 'Is content 18+?', required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  audience_eighteen_plus?: boolean;

  @ApiProperty({ description: 'Content warning', required: false })
  @IsString()
  @IsOptional()
  content_warning?: string;

  @ApiProperty({
    type: [String],
    description: 'List of hashtags',
    example: ['fun', 'music', 'travel'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  hashtags: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Allow comments or not',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  allow_comment: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Allow voice comments or not',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  allow_voice_comment: boolean;

  @ApiProperty({
    type: Number,
    description: 'Amount to pay for allowing a comment',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pay_for_comment: number;

  @ApiProperty({
    type: Number,
    description: 'Amount to pay for allowing a voice comment',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pay_for_voice_comment: number;

  @ApiProperty({
    type: String,
    description: 'Season ID (User reference)',
    example: '66110fb9c0e567dd7a2f65a1',
  })
  season: string;

  @ApiProperty({
    type: Boolean,
    description: 'Enable premium monetization or not',
    example: false,
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  is_premium_monetisation: boolean;

  @ApiProperty({
    type: Number,
    description: 'Amount for premium monetization',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  amount_premium_monetisation: number;

  @ApiProperty({
    type: Boolean,
    description: 'Allow custom premium monetization amount',
    // default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  custom_amount_premium_monetisation: boolean;
}

export class PostFilterationDto extends PaginationDto {
  @ApiPropertyOptional({
    example: '67e590dbfe1ede70dfced61b',
  })
  @IsMongoId()
  @IsOptional()
  user_id: string;

  @ApiPropertyOptional({
    example: '6814df8ce6ecd1d34aa38646',
  })
  @IsMongoId()
  @IsOptional()
  season: string;
}
