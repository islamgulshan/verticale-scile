import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PicksNotifaction } from './picks.notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class PicksNotificationService {
    constructor(@InjectModel(PicksNotifaction.name) private picksNotifactionModel: Model<PicksNotifaction>) { }
    async create(dto: Partial<PicksNotifaction>): Promise<PicksNotifaction> {
        return this.picksNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }
    async getByUser(user_id: Partial<PicksNotifaction>): Promise<PicksNotifaction> {
        return this.picksNotifactionModel.findOne({ user_id });
    }
}
