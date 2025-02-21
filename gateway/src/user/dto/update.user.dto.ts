import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

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
