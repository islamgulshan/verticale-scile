import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { QuickSettings } from './quick-settings.schema';

@Injectable()
export class QuickSettingsService {
  constructor(
    @InjectModel(QuickSettings.name)
    private QuickSettingsModel: Model<QuickSettings>,
  ) {}
  async create(dto: Partial<QuickSettings>): Promise<QuickSettings> {
    const data = await this.QuickSettingsModel.findOne({
      user_id: dto.user_id,
    });
    if (data?.wallet?.subscription || data?.wallet?.package) {
      dto.wallet.subscription = data?.wallet?.subscription;
      dto.wallet.package = data?.wallet?.package;
    }

    return this.QuickSettingsModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
  }
  async getByUser(user_id: Partial<QuickSettings>): Promise<QuickSettings> {
    return this.QuickSettingsModel.findOne({ user_id }).populate([
      { path: 'wallet.subscription', model: 'GooglePay' },
      { path: 'wallet.package', model: 'Packages' },
    ]);
  }

  async addPackage(dto: Partial<QuickSettings>): Promise<QuickSettings> {
    return this.QuickSettingsModel.findOneAndUpdate(
      { user_id: dto.user_id },
      {
        $set: {
          'wallet.subscription': dto.wallet.subscription,
          'wallet.package': dto.wallet.package,
        },
      },
      { new: true },
    );
  }
}
