import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'User email address',
    example: 'tariqkhansherazi@gmail.com',  // Optional, for Swagger UI example
  })
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    description: 'User password',
    example: 'Pass!11',  // Optional, for Swagger UI example
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
