import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LiveSettingMonetization } from './live-settings.schema';
import { Model } from 'mongoose';

@Injectable()
export class LiveSettingsService {
  constructor(
    @InjectModel(LiveSettingMonetization.name)
    private LiveSettingMonetizationModel: Model<LiveSettingMonetization>,
  ) {}
  async create(
    dto: Partial<LiveSettingMonetization>,
  ): Promise<LiveSettingMonetization> {
    return this.LiveSettingMonetizationModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
  }
  async getByUser(
    user_id: Partial<LiveSettingMonetization>,
  ): Promise<LiveSettingMonetization> {
    return this.LiveSettingMonetizationModel.findOne({ user_id });
  }
}
