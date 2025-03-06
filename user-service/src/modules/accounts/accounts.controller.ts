import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Accounts } from './accounts-schema';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsServiceService: AccountsService) {}
  @MessagePattern('create-accounts')
  create(@Payload() dto: Partial<Accounts>) {
    return this.accountsServiceService.create(dto);
  }
  @MessagePattern('user-accounts')
  getByUser(@Payload() user_id: Partial<Accounts>) {
    return this.accountsServiceService.getByUser(user_id);
  }
  @MessagePattern('decativation-accounts')
  deActive(@Payload() dto: Partial<Accounts>) {
    return this.accountsServiceService.ActivedeActive(dto);
  }
  @MessagePattern('delete-accounts')
  delete(@Payload() user_id: Partial<Accounts>) {
    return this.accountsServiceService.delete(user_id);
  }
}
