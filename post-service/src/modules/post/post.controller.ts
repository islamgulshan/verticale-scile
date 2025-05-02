import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Post } from 'src/models/post';
import { PaginatedResponseType } from 'src/common';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @MessagePattern('create-post')
  create(@Payload() dto: Partial<Post>) {
    return this.postService.create(dto);
  }

  @MessagePattern('get-post-by-id')
  getById(@Payload() id: string) {
    return this.postService.getById(id);
  }

  @MessagePattern('get-posts')
  getAll(
    @Payload()
    dto: {
      user_id?: string;
      season?: string;
      page?: number;
      limit: number;
    },
  ): Promise<PaginatedResponseType<Post>> {
    return this.postService.getAll(dto);
  }
  @MessagePattern('update-post')
  update(@Payload() dto: Partial<Post>) {
    return this.postService.update(dto.id, dto);
  }

  @MessagePattern('delete-post')
  delete(@Payload() id: string) {
    return this.postService.delete(id);
  }
}
