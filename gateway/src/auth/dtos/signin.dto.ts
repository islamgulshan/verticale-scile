import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'User email address (Required if user_name is not provided)',
    example: 'tariqkhansherazi@gmail.com',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => !o.user_name) // Validate if user_name is missing
  @IsNotEmpty({ message: 'Either email or user_name must be provided' })
  email: string;

  @ApiProperty({
    description: 'User name (Required if email is not provided)',
    example: 'tariq@fos',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => !o.email) // Validate if email is missing
  @IsNotEmpty({ message: 'Either user_name or email must be provided' })
  user_name: string;
  
  @ApiProperty({
    description: 'User password',
    example: 'Pass!11',  // Optional, for Swagger UI example
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
