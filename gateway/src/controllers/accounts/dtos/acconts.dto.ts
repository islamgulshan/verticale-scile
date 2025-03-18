import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';

class AccountVerification {
  @ApiPropertyOptional({
    description: 'License document (image URL)',
    format: 'binary',
  })
  @IsOptional()
  license?: Express.Multer.File;

  @ApiProperty({
    description: 'Reasons for account verification',
    example: ['Missing documents', 'Invalid license'],
  })
  @IsArray()
  @IsString({ each: true })
  reasons: string[];
}

export class PersonalInformationDto {
  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  @IsOptional()
  full_name: string;

  @ApiProperty({ description: 'Date of birth', example: '1995-06-15' })
  @IsString()
  @IsOptional()
  date_of_birth: string;

  @ApiProperty({ description: 'Gender of the user', example: 'Male' })
  @IsString()
  @IsOptional()
  gender: string;
}

export class AccountsDtos {
  @ApiProperty({
    description: 'Personal information details',
    type: () => PersonalInformationDto,
  })
  @IsObject()
  @IsOptional()
  persnal_information: PersonalInformationDto;

  @ApiProperty({ description: 'Preferred language', example: 'English' })
  @IsString()
  @IsOptional()
  langauge: string;

  // @ApiProperty({
  //   description: 'Account verification details',
  //   type: () => AccountVerification,
  // })
  // @IsObject()
  // account_verification: AccountVerification;

  @ApiProperty({
    description: 'Whether suggested content is enabled',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  suggested_content: boolean;

  @ApiProperty({
    description: 'Whether auto content generation is enabled',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  auto_content: boolean;

  @ApiProperty({
    description: 'User interests',
    example: 'Technology, AI, Blockchain',
  })
  @IsOptional()
  @IsString()
  interust: string;

  @ApiProperty({ description: 'User location', example: 'New York, USA' })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({ description: 'Gender and age details', example: 'Male, 28' })
  @IsString()
  @IsOptional()
  gender_and_age: string;
}

export enum AccountStatus {
  ACTIVE = 'active',
  DEACTIVE = 'deactive',
}

export class DeActivateAccountDto {
  @ApiProperty({
    description: 'Reason for deactivating the account',
    example: 'User requested deactivation',
  })
  @IsString()
  de_activation_reason: string;

  @ApiProperty({
    description: 'Account status',
    example: AccountStatus.DEACTIVE,
    enum: AccountStatus,
  })
  @IsEnum(AccountStatus, {
    message: `Status must be ${Object.values(AccountStatus).join(' or ')}`,
  })
  status: AccountStatus;
}
export class VerifyAccountsDtos {
  @ApiProperty({ description: 'status', example: 'Level-1' })
  @IsString()
  verication_status: string;

  @ApiProperty({
    description: 'user_id',
    example: 'user_id',
  })
  @IsMongoId()
  user_id: string;
}
