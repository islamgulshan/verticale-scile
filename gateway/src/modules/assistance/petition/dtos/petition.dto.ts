import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AssistancePetitionDto {
  @ApiProperty({
    description: 'about',
    example: 'This app',
    required: true,
  })
  @IsString()
  @IsOptional()
  about: string;

  @ApiProperty({
    description: 'topic',
    example: 'Messaging system',
    required: true,
  })
  @IsString()
  @IsOptional()
  topic: string;

  @ApiProperty({
    description: 'title',
    example: 'Title',
    required: true,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'story',
    example: 'your story ...',
    required: true,
  })
  @IsString()
  @IsOptional()
  story: string;
}
