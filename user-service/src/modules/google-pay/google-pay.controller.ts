import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GooglePayService } from './google-pay.service';
import { GooglePay } from './google-pay.schema';

@Controller('google-pay')
export class GooglePayController {
  constructor(private readonly accountsServiceService: GooglePayService) {}
  @MessagePattern('google-pay')
  async processPayment(@Payload() dto: any) {
    return this.accountsServiceService.processPayment(100, 'USD');
  }

  @MessagePattern('google-pay-subscription')
  async subscription(@Payload() dto: Partial<GooglePay>): Promise<GooglePay> {
    return this.accountsServiceService.subscription(dto);
  }
}
