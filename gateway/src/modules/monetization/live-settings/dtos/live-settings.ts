import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ContentWarning } from '../../../../constants/common';

export class LiveSettingsMonetizationDto {
  @ApiProperty({
    description: 'Flag to display earning number',
    default: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  display_earning_number?: boolean;

  @ApiProperty({
    description: 'Flag to display earning ',
    default: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  display_earning?: boolean;

  @ApiProperty({
    description: 'Flag to allow flash light',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  allow_flash_light: boolean;

  @ApiProperty({
    description: 'roles',
    example: ['No hate speech', 'No Polictics'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @ApiProperty({
    description: 'Background music setting',
    example: 'jazz.mp3',
    required: false,
  })
  @IsString()
  @IsOptional()
  background_music?: string;

  @ApiProperty({
    description: 'Voice mode setting',
    example: 'robotic',
    required: false,
  })
  @IsString()
  @IsOptional()
  voice_mode?: string;

  @ApiProperty({
    description: 'Flag indicating if the user is under 18',
    default: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  under_eighten?: boolean;

  @ApiProperty({
    description: 'Flag indicating if the user is 18+',
    default: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  eighten_plus?: boolean;

  @ApiProperty({
    description: 'Content warning type',
    enum: ContentWarning,
    example: ContentWarning.SENSITIVE,
  })
  @ApiProperty({
    description: `Content warning setting`,
    enum: ContentWarning,
    example: ContentWarning.SENSITIVE,
    required: false,
    nullable: true, // Allows null in OpenAPI
  })
  @ValidateIf((obj) => obj.content_warning !== '') // Skip validation if empty string
  @IsEnum(ContentWarning, {
    message: `content_warning must be a valid ContentWarning enum: ${Object.values(
      ContentWarning,
    ).join(' or ')}`,
  })
  @IsOptional()
  content_warning: ContentWarning;
}
