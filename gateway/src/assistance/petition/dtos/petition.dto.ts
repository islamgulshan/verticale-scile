import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssistancePetitionDto {
  @ApiProperty({
    description: 'about',
    example: 'This app',
    required: true,
  })
  @IsString()
  about: string;

  @ApiProperty({
    description: 'topic',
    example: 'Messaging system',
    required: true,
  })
  @IsString()
  topic: string;

  @ApiProperty({
    description: 'title',
    example: 'Title',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'story',
    example: 'your story ...',
    required: true,
  })
  @IsString()
  story: string;
}
