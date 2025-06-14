import { ApiProperty } from '@nestjs/swagger';

export class MatchDto {
  @ApiProperty({ description: 'ID of the matched candidate' })
  candidateId: string;

  @ApiProperty({
    description: 'Cosine similarity score between job and candidate',
  })
  score: number;
}
