import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class PackagesDto {
  @ApiProperty({ type: String, description: 'Title of the item' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'Subtitle of the item' })
  @IsString()
  sub_title: string;

  @ApiProperty({
    type: Number,
    description: 'Amount as a number',
    example: 100,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({ type: [String], description: 'List of features' })
  @IsArray()
  features: string[];
}
