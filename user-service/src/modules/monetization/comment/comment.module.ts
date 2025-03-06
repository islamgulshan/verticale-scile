import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CommentMonetization,
  CommentMonetizationSchema,
} from './comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CommentMonetization.name,
        schema: CommentMonetizationSchema,
      },
    ]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
