import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BlockUser } from './block-user.schema';
import { BlockUserService } from './block-user.service';

@Controller('block-user')
export class BlockUserController {
  constructor(private readonly assistancePetitionService: BlockUserService) {}
  @MessagePattern('block-user')
  block(@Payload() dto: Partial<BlockUser>) {
    return this.assistancePetitionService.block(dto);
  }
  @MessagePattern('unblock-user')
  unblock(@Payload() payload?: BlockUser) {
    return this.assistancePetitionService.unblock(payload);
  }

  @MessagePattern('get-block-user')
  getblockuser(@Payload() user_id: string) {
    return this.assistancePetitionService.getBlockUsers(user_id);
  }
}
