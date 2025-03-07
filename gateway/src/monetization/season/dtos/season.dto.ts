import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateSeasonsDto {
  @ApiProperty({ example: 'Summer Special', description: 'Name of the season' })
  @IsString()
  season_name: string;

  @ApiProperty({
    example: 10,
    description: 'Number of content pieces in the season',
  })
  @IsNumber()
  number_of_content: number;

  @ApiProperty({
    example: true,
    description: 'Whether monetization is premium',
  })
  @IsBoolean()
  premium_monetization: boolean;

  @ApiProperty({
    example: 49.99,
    description: 'Monetization amount for the season',
  })
  @IsNumber()
  season_amount: number;
}

export class UpdateSeasonsDto extends CreateSeasonsDto {}
