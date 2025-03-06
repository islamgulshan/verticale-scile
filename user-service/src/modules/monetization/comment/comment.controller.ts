import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CommentMonetization } from './comment.schema';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @MessagePattern('create-comment-monetization')
  create(@Payload() dto: Partial<CommentMonetization>) {
    return this.commentService.create(dto);
  }
  @MessagePattern('user-comment-monetization')
  getByUser(@Payload() user_id: Partial<CommentMonetization>) {
    return this.commentService.getByUser(user_id);
  }
}
