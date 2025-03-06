import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountMonetization } from './account-monetization.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountMonetizationService {
  constructor(
    @InjectModel(AccountMonetization.name)
    private AccountMonetizationModel: Model<AccountMonetization>,
  ) {}
  async create(
    dto: Partial<AccountMonetization>,
  ): Promise<AccountMonetization> {
    return this.AccountMonetizationModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
  }
  async getByUser(
    user_id: Partial<AccountMonetization>,
  ): Promise<AccountMonetization> {
    return this.AccountMonetizationModel.findOne({ user_id });
  }
}
