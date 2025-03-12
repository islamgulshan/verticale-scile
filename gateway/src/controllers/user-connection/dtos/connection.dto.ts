import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ConnectionUserDto {
  @ApiProperty({
    description: 'connection_id',
    example: 'connection_id',
    required: true,
  })
  @IsMongoId()
  connection_id: string;
}
