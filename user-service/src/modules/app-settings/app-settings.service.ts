import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppSettings } from './app-settings.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppSettingsService {
     constructor(@InjectModel(AppSettings.name) private inboxNotifactionModel: Model<AppSettings>) { }
        async create(dto: Partial<AppSettings>): Promise<AppSettings> {
            return this.inboxNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
        }
        async getByUser(user_id: Partial<AppSettings>): Promise<AppSettings> {
            return this.inboxNotifactionModel.findOne({ user_id });
        }
}
