import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { ReferralActionEnum, UserRole } from '../../constants/common';

export class UserBenefitDto {
    @ApiProperty({ description: 'Header for user benefit', example: 4.00 })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Description for user benefit', example: 'User gets access to exclusive content' })
    @IsString()
    description: string;
}



export class RolesDto {
    @ApiProperty({ description: 'Is content creator', example: false })
    @IsBoolean()
    content_creator: boolean;

    @ApiProperty({ description: 'Is upcoming content creator', example: false })
    @IsBoolean()
    upcomming_content_creator: boolean;

    @ApiProperty({ description: 'Is viewer', example: true })
    @IsBoolean()
    viewer: boolean;

    @ApiProperty({ description: 'Is business user', example: false })
    @IsBoolean()
    business: boolean;
}



export class ReferralDto {

    @ApiProperty({ description: 'User role', enum: ReferralActionEnum, example: ReferralActionEnum.GENERATE_CODE })
    @IsEnum(ReferralActionEnum)
    action: ReferralActionEnum;

    @ApiProperty({ description: 'Discount percentage', example: 10 })
    @IsNumber()
    discount_percent: number;

    @ApiProperty({ description: 'Referral code', example: "12345" })
    @IsString()
    referral_code: string;

    @ApiProperty({ description: 'Is custom referral', example: false })
    @IsBoolean()
    custom: boolean;
}




export class MonetizationDto {
    @ApiProperty({ description: 'List of user benefits', type: [UserBenefitDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserBenefitDto)
    user_benefit: UserBenefitDto[];

    @ApiProperty({ description: 'Amount earned', example: 500 })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Is under eighteen', example: false })
    @IsBoolean()
    under_eighteen: boolean;

    @ApiProperty({ description: 'Content type', example: 'Sensitive' })
    @IsString()
    content_type: string;

    @ApiProperty({ description: 'Content description', example: 'Exclusive content for premium users' })
    @IsString()
    content_description: string;

    @ApiProperty({ description: 'Driving license number', example: 'DL-12345678' })
    @IsString()
    driving_license: string;
}


export class CreateUserSettingDto {
    @ApiProperty({ description: 'User ID', example: '67b9e4768beb7509acd5537b' })
    @IsMongoId()
    user_id: string;

    @ApiProperty({ description: 'User role', enum: UserRole, example: UserRole.CONTENT_CREATOR })
    @IsEnum(UserRole)
    role: UserRole;



    @ApiProperty({ description: 'Referral details', type: ReferralDto })
    @ValidateNested()
    @Type(() => ReferralDto)
    referral: ReferralDto;

    @ApiProperty({ description: 'Monetization details', type: MonetizationDto })
    @ValidateNested()
    @Type(() => MonetizationDto)
    monetization: MonetizationDto;

    @ApiProperty({ description: 'Redeem code', example: 'XYZ123', required: false })
    @IsOptional()
    @IsString()
    redeem_code?: string;
}


export class UpdateUserSettingDto extends CreateUserSettingDto {
    @IsOptional()
    @ApiProperty({ description: 'Optional update fields' })
    user_id: string;
}