import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsOptional()
  @IsString()
  user_name?: string;

}



export class ResetPasswordDto {
 
 @ApiProperty({ example: 'tariqkhansherazi@gmail.com', description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '201280', description: 'verfication code' })
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


export class ChangePasswordDto {
  @ApiProperty({ example: 'pass!11', description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Pass!11', description: 'User password (min 6 characters, one uppercase, one number, one special character)' })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter, one number, and one special character',
  })
  new_password: string;

}
