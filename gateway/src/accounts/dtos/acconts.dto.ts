import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsArray, IsObject, IsMongoId, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

class AccountVerification {
  @ApiPropertyOptional({ description: 'License document (image URL)', example: 'https://example.com/license.jpg' })
  @IsOptional()
  @IsString()
  license?: string;

  @ApiProperty({ description: 'Reasons for account verification', example: ['Missing documents', 'Invalid license'] })
  @IsArray()
  @IsString({ each: true })
  reasons: string[];
}

class PersonalInformation {
  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  full_name: string;

  @ApiProperty({ description: 'Date of birth', example: '1995-06-15' })
  @IsString()
  date_of_birth: string;

  @ApiProperty({ description: 'Gender of the user', example: 'Male' })
  @IsString()
  gender: string;
}

export class AccountsDtos {
  @ApiProperty({ description: 'Personal information details', type: () => PersonalInformation })
  @IsObject()
  persnal_information: PersonalInformation;

  @ApiProperty({ description: 'Preferred language', example: 'English' })
  @IsString()
  langauge: string;

  @ApiProperty({ description: 'Account verification details', type: () => AccountVerification })
  @IsObject()
  account_verification: AccountVerification;

  @ApiProperty({ description: 'Whether suggested content is enabled', example: false })
  @IsBoolean()
  suggested_content: boolean;

  @ApiProperty({ description: 'Whether auto content generation is enabled', example: false })
  @IsBoolean()
  auto_content: boolean;

  @ApiProperty({ description: 'User interests', example: 'Technology, AI, Blockchain' })
  @IsString()
  interust: string;

  @ApiProperty({ description: 'User location', example: 'New York, USA' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Gender and age details', example: 'Male, 28' })
  @IsString()
  gender_and_age: string;
  
}

export enum AccountStatus {
    ACTIVE = 'active',
    DEACTIVE = 'deactive',
  }

export class DeActivateAccountDto {
    @ApiProperty({ description: 'Reason for deactivating the account', example: 'User requested deactivation' })
    @IsString()
    de_activation_reason: string;

    @ApiProperty({ description: 'Account status', example: AccountStatus.DEACTIVE, enum: AccountStatus })
    @IsEnum(AccountStatus, { message: `Status must be ${Object.values(AccountStatus).join(' or ')}` })
    
    status: AccountStatus;
}  
