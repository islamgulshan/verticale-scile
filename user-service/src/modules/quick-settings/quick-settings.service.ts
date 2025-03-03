import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { QuickSettings } from './quick-settings.schema';

@Injectable()
export class QuickSettingsService {
     constructor(@InjectModel(QuickSettings.name) private QuickSettingsModel: Model<QuickSettings>) { }
        async create(dto: Partial<QuickSettings>): Promise<QuickSettings> {
            return this.QuickSettingsModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
        }
        async getByUser(user_id: Partial<QuickSettings>): Promise<QuickSettings> {
            return this.QuickSettingsModel.findOne({ user_id });
        }
}
