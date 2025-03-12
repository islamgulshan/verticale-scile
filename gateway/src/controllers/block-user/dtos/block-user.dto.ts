import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class BlockUserDto {
  @ApiProperty({
    description: 'block_user',
    example: 'user_id',
    required: true,
  })
  @IsMongoId()
  block_user: string;
}
