import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  code: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}


export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    user_name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsEmail()
    code: string;
  
    @IsNotEmpty()
    @MinLength(6)
    password: string;
  }


  export class getUsersDto {
    search: string;
    page: number;
    limit: number;
  }