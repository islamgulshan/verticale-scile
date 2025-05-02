import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common';

export class CreateSeasonRequestDto {
  @ApiPropertyOptional({
    example: 'season_1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SeasonFilterationDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 'season_1',
  })
  @IsString()
  @IsOptional()
  name: string;
}
