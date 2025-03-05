import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrivacyContent } from './privacy-content-schema';
import { PrivacyContentService } from './privacy-content.service';

@Controller('privacy-content')
export class PrivacyContentController {
  constructor(private readonly privacyContentService: PrivacyContentService) {}
  @MessagePattern('create-privacy-content')
  create(@Payload() dto: Partial<PrivacyContent>) {
    return this.privacyContentService.create(dto);
  }
  @MessagePattern('user-privacy-content')
  getByUser(@Payload() user_id: Partial<PrivacyContent>) {
    return this.privacyContentService.getByUser(user_id);
  }
}
