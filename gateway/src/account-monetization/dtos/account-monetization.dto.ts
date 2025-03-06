import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { Express } from 'express';

export class UserBenefitDto {
  @Expose()
  header: string;

  @Expose()
  desc: string;
}

export class AccountMonetizationDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'User ID',
    type: String,
  })
  @Expose()
  user_id: Types.ObjectId;

  @ApiProperty({ example: true, description: 'Enable account monetization' })
  @IsBoolean()
  @Expose()
  enable_account_monetization: boolean;

  @ApiProperty({
    type: [UserBenefitDto],
    description: 'List of user benefits',
    example: [
      { header: 'Ad-Free Experience', desc: 'Watch videos without ads' },
      {
        header: 'Priority Support',
        desc: 'Get access to 24/7 customer support',
      },
    ],
  })
  @ValidateNested({ each: true }) // ✅ Ensures each element is validated
  @Type(() => UserBenefitDto) // ✅ Properly transforms nested objects
  @Expose()
  user_benefit: UserBenefitDto[];

  @ApiProperty({ example: 500, description: 'Monetization amount in USD' })
  @IsNumber()
  @Expose()
  amount: number;

  @ApiProperty({ example: true, description: 'Applicable for users under 18' })
  @IsBoolean()
  @Expose()
  for_under_eighteen: boolean;

  @ApiProperty({
    example: false,
    description: 'Not applicable for users under 18',
  })
  @IsBoolean()
  @Expose()
  not_for_under_eighteen: boolean;

  @ApiProperty({
    example: 'video',
    description: 'Type of content being monetized',
  })
  @IsString()
  @Expose()
  content_type: string;

  @ApiProperty({
    example: 'Exclusive behind-the-scenes videos',
    description: 'Description of the content',
  })
  @IsString()
  @Expose()
  content_description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Driving license file (Upload a PDF, JPG, or PNG)',
  })
  @IsOptional()
  @Expose()
  driving_license?: Express.Multer.File;
}
