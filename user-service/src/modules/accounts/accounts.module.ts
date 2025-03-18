import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accounts, AccountsSchema } from './accounts-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Accounts.name, schema: AccountsSchema },
    ]),
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
