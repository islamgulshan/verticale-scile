import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsOptional } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: '60f5a3a5c6d6b34dccf3d1b2', description: 'User ID' })
  user_id: Types.ObjectId;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Profile picture' })
  @IsOptional()
  profile_picture?: Express.Multer.File;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Cover picture' })
  @IsOptional()
  cover_picture?: Express.Multer.File;

  @ApiPropertyOptional({ example: 'New York', description: 'Location' })
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: 2, description: 'Verification level' })
  @IsOptional()
  verification_level?: number;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'New York', description: 'Name' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'New profile picture' })
  @IsOptional()
  bio?: String;

  @ApiPropertyOptional({ type: 'string', description: 'user name' })
  @IsOptional()
  user_name?: String;

  @ApiPropertyOptional({ type: 'islamabad', description: 'loc' })
  @IsOptional()
  location?: String;
}
