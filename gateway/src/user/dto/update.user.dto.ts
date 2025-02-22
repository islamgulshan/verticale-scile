import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsPhoneNumber, IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number of the user' })
  @IsOptional()
  @IsPhoneNumber(null)
  phone?: string;

  @ApiProperty({ example: 'Asia/Karachi', description: 'Timezone of the user' })
  @IsOptional()
  @IsString()
  time_zone?: string;

  @ApiProperty({ example: 'Islamabad/Pakistan', description: 'Address of the user' })
  @IsOptional()
  @IsString()
  address?:string

//   @ApiProperty({ example: '673ae02fef50eeab0876a23a', description: 'Organization of the user' })
//   @IsOptional()
//   @IsString()
//   organization?:string
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
