import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportMessagesService } from './report-messages.service';
import { ReportMessages } from './report-messages.schema';
import { ReportMessageDto } from './dto';

@Controller('report-messages')
export class ReportMessagesController {
  constructor(private readonly reportMessagesService: ReportMessagesService) {}
  @MessagePattern('report-message')
  message(@Payload() dto: Partial<ReportMessages>) {
    return this.reportMessagesService.message(dto);
  }
  @MessagePattern('get-user-report-chat')
  getUserChat(@Payload() payload?: ReportMessageDto) {
    return this.reportMessagesService.getUserChat(payload);
  }
  @MessagePattern('admin-reply-message')
  adminReply(@Payload() dto: Partial<ReportMessages>) {
    return this.reportMessagesService.adminReply(dto);
  }
}
