import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts } from './accounts-schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts.name) private AccountsModel: Model<Accounts>,
  ) {}
  async create(dto: Partial<Accounts>): Promise<Accounts> {
    return this.AccountsModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
  }

  async createPersnalInfo(dto: Partial<Accounts>): Promise<Accounts> {
    const update = await this.AccountsModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
    if (
      update.account_verification.reasons?.length &&
      update.account_verification.license
    ) {
      this.verifyAccount({
        verication_status: 'Level-2',
        user_id: dto.user_id,
      });
    } else if (
      update.account_verification?.reasons?.length ||
      update.account_verification?.license
    ) {
      this.verifyAccount({
        verication_status: 'Level-1',
        user_id: dto.user_id,
      });
    }
    return update;
  }
  async getByUser(user_id: Partial<Accounts>): Promise<Accounts> {
    return this.AccountsModel.findOne({ user_id });
  }

  async ActivedeActive(dto: Partial<Accounts>): Promise<Accounts> {
    return this.AccountsModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true },
    );
  }

  async delete(user_id: Partial<Accounts>): Promise<Accounts> {
    return this.AccountsModel.findOneAndDelete({ user_id });
  }
  async verifyAccount(dto: Partial<Accounts>): Promise<Accounts> {
    return this.AccountsModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto, verication_date: new Date() },
      { new: true },
    );
  }
}
