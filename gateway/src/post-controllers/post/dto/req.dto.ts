import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostRelationType } from '../../../constants';
import { Transform } from 'class-transformer';

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
  description: string;

  @ApiProperty({ description: 'Type of post' })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    type: [String],
    description: 'Tagged users (user IDs)',
    required: false,
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
}
