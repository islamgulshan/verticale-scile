import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class TwoFactorAuthDto {
  @ApiProperty({
    description: 'Current PIN for authentication',
    example: 100001,
  })
  @IsNumber({}, { message: 'PIN must be a number' })
  pin: number;

  @ApiProperty({
    description: 'Enable or disable two-factor authentication',
    example: false,
  })
  @IsBoolean()
  two_factor_enable: boolean;
}

export class UpdateTwoFactorAuthDto {
  @ApiProperty({
    description: 'Current PIN for authentication',
    example: 100001,
  })
  @IsOptional()
  @IsNumber({}, { message: 'PIN must be a number' })
  pin?: number;

  @ApiProperty({
    description: 'Enable or disable two-factor authentication',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  two_factor_enable?: boolean;
  @ApiProperty({
    description: 'New PIN for updating authentication',
    example: 123456,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'New PIN must be a number' })
  new_pin?: number;
}

export class VerifyTwoFactorAuthDto {
  @ApiProperty({
    description: 'PIN for authentication',
    example: 123456,
  })
  @IsNumber({}, { message: 'PIN must be a number' })
  pin: number;
}
