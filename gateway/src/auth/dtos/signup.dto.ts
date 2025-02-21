import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',  // Optional, for Swagger UI example
  })
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    description: 'User password',
    example: 'password123',  // Optional, for Swagger UI example
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
