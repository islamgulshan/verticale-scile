import { ApiProperty } from '@nestjs/swagger';
import { WalletPlainType } from '../../../constants';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Plain {
  @ApiProperty({
    description: 'Type of the plain',
    example: WalletPlainType.PREMIUM,
  })
  @IsEnum(WalletPlainType, {
    message: `Type must be a valid WalletPlainType enum  either ${Object.values(
      WalletPlainType,
    ).join(' or ')}`,
  })
  type: WalletPlainType;

  @ApiProperty({ description: 'Price of the plain', example: 100 })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
}

class Wallet {
  @ApiProperty({ description: 'Current amount in wallet', example: 500 })
  @IsNumber({}, { message: 'Current amount must be a number' })
  current_amount: number;

  @ApiProperty({ description: 'Plain details', type: () => Plain })
  @ValidateNested()
  @Type(() => Plain)
  plain: Plain;

  @ApiProperty({ description: 'Referral code', example: 'ABC123' })
  @IsString({ message: 'Referral code must be a string' })
  @IsOptional()
  referal_code?: string;
}

export class QuickSettingsDtos {
  @ApiProperty({ description: 'Notification off status', example: false })
  @IsBoolean({ message: 'Notification off must be a boolean' })
  @IsOptional()
  notification_off: boolean;

  @ApiProperty({ description: 'Connection request status', example: false })
  @IsBoolean({ message: 'Connection request must be a boolean' })
  @IsOptional()
  connection_request: boolean;

  @ApiProperty({ description: 'Wallet details', type: () => Wallet })
  @ValidateNested()
  @Type(() => Wallet)
  @IsOptional()
  wallet: Wallet;
}
