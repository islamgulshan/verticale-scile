import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class GetOtp {
   @ApiProperty({ example: 'tariqkhansherazi@gmail.com', description: 'User email address' })
    @IsNotEmpty()
    @IsEmail()
    email: string;  
}