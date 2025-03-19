import { Module } from '@nestjs/common';
import { GooglePayService } from './google-pay.service';
import { GooglePayController } from './google-pay.controller';
import { QuickSettingsModule } from '../quick-settings/quick-settings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GooglePay, GooglePaySchema } from './google-pay.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GooglePay.name,
        schema: GooglePaySchema,
      },
    ]),
    QuickSettingsModule,
  ],
  providers: [GooglePayService],
  controllers: [GooglePayController],
})
export class GooglePayModule {}
