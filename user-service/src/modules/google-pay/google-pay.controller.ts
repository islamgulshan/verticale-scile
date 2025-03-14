import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GooglePayService } from './google-pay.service';

@Controller('google-pay')
export class GooglePayController {
  constructor(private readonly accountsServiceService: GooglePayService) {}
  @MessagePattern('google-pay')
  async processPayment(@Payload() dto: any) {
    return this.accountsServiceService.processPayment(100, 'USD');
  }
}
