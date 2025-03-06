import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DirectMessageService } from './direct-message.service';
import { DirectMessageMonetization } from './direct-message.schema';

@Controller('direct-message')
export class DirectMessageController {
  constructor(private readonly directMessageService: DirectMessageService) {}
  @MessagePattern('create-direct-message')
  create(@Payload() dto: Partial<DirectMessageMonetization>) {
    return this.directMessageService.create(dto);
  }
  @MessagePattern('user-direct-message')
  getByUser(@Payload() user_id: Partial<DirectMessageMonetization>) {
    return this.directMessageService.getByUser(user_id);
  }
}
