import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;
}
