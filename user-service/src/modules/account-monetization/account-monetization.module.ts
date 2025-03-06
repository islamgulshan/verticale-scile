import { Module } from '@nestjs/common';
import { AccountMonetizationService } from './account-monetization.service';
import { AccountMonetizationController } from './account-monetization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AccountMonetization,
  AccountMonetizationSchema,
} from './account-monetization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountMonetization.name, schema: AccountMonetizationSchema },
    ]),
  ],

  providers: [AccountMonetizationService],
  controllers: [AccountMonetizationController],
})
export class AccountMonetizationModule {}
