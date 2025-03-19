import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsObject } from 'class-validator';
import { Types } from 'mongoose';

export class subscriptionDto {
  @ApiProperty({
    type: Object,
    description: 'Data object containing additional details',
  })
  @IsObject()
  payment_detail: object;

  @ApiProperty({
    type: String,
    description: 'Package ID referencing the Package collection',
  })
  @IsMongoId()
  package: Types.ObjectId;
}
