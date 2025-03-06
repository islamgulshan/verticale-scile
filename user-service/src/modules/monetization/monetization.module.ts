import { Module } from '@nestjs/common';
import { DirectMessageModule } from './direct-message/direct-message.module';
import { AccountMonetizationModule } from './account-monetization/account-monetization.module';

@Module({
  imports: [DirectMessageModule, AccountMonetizationModule],
})
export class MonetizationModule {}
