import { Module } from '@nestjs/common';
import { HashTagController } from './hash-tag.controller';
import { HashTagService } from './hash-tag.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HashTag, HashTagSchema } from 'src/models/hashtag';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HashTag.name,
        schema: HashTagSchema,
      },
    ]),
  ],

  controllers: [HashTagController],
  providers: [HashTagService],
  exports: [HashTagService],
})
export class HashTagModule {}
