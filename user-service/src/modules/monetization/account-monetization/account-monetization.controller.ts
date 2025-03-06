import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountMonetization } from './account-monetization.schema';
import { AccountMonetizationService } from './account-monetization.service';

@Controller('account-monetization')
export class AccountMonetizationController {
  constructor(
    private readonly accountMonetizationService: AccountMonetizationService,
  ) {}
  @MessagePattern('create-account-monetization')
  create(@Payload() dto: Partial<AccountMonetization>) {
    return this.accountMonetizationService.create(dto);
  }
  @MessagePattern('user-account-monetization')
  getByUser(@Payload() user_id: Partial<AccountMonetization>) {
    return this.accountMonetizationService.getByUser(user_id);
  }
}
