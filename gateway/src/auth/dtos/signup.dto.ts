import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Tariq.sherazi', description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty({ example: 'tariqkhansherazi@gmail.com', description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '101022', description: 'verfication code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'Pass!11', description: 'User password (min 6 characters, one uppercase, one number, one special character)' })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;

}
