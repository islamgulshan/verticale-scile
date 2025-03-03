import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppSettings } from './app-settings.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppSettingsService {
     constructor(@InjectModel(AppSettings.name) private AppSettingsModel: Model<AppSettings>) { }
        async create(dto: Partial<AppSettings>): Promise<AppSettings> {
            return this.AppSettingsModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
        }
        async getByUser(user_id: Partial<AppSettings>): Promise<AppSettings> {
            return this.AppSettingsModel.findOne({ user_id });
        }
}
