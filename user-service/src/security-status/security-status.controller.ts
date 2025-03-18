import { Controller } from '@nestjs/common';
import { SecurityStatusService } from './security-status.service';
import { SecurityStatus } from './security-status.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('security-status')
export class SecurityStatusController {
  constructor(private readonly SecurityStatusService: SecurityStatusService) {}
  @MessagePattern('create-security-status')
  create(@Payload() dto: Partial<SecurityStatus>) {
    return this.SecurityStatusService.create(dto);
  }
  @MessagePattern('user-security-status')
  getByUser(@Payload() user_id: string) {
    return this.SecurityStatusService.get(user_id);
  }
}
