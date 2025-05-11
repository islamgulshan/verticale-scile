import { Controller } from '@nestjs/common';
import { HashTagService } from './hash-tag.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HashTag } from 'src/models/hashtag';

@Controller('hash-tag')
export class HashTagController {
  constructor(private hashTagService: HashTagService) {}
  @MessagePattern('get-hash-tags')
  async getAll(@Payload() search: string): Promise<HashTag[]> {
    return this.hashTagService.getAll(search);
  }
}
