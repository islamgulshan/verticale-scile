import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ description: 'Unique job identifier' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Title of the job' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the job' })
  @IsString()
  description: string;
}
