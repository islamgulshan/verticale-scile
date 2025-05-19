import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetOtp {
  @ApiProperty({
    example: 'tariqkhansherazi@gmail.com',
    description: 'User email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'signup', description: 'OTP for' })
  @IsOptional()
  @IsString()
  type: string;
}
