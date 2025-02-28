import { IsNotEmpty, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProfileDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsArray()
  @IsOptional()
  profile_pictures_list?: string[];

  @IsArray()
  @IsOptional()
  profile_picture?: string[];

  @IsArray()
  @IsOptional()
  cover_picture_list?: string[];

  @IsString()
  @IsOptional()
  cover_picture?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  verification_level?: number;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
