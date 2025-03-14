import { Module } from '@nestjs/common';
import { GooglePayService } from './google-pay.service';
import { GooglePayController } from './google-pay.controller';

@Module({
  providers: [GooglePayService],
  controllers: [GooglePayController]
})
export class GooglePayModule {}
