import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MomentsNotifaction } from './moments.notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class MomentsNotificationService {
    constructor(@InjectModel(MomentsNotifaction.name) private momentsNotifactionModel: Model<MomentsNotifaction>) { }
    async create(dto: Partial<MomentsNotifaction>): Promise<MomentsNotifaction> {
        return this.momentsNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }
    async getByUser(user_id: Partial<MomentsNotifaction>): Promise<MomentsNotifaction> {
        return this.momentsNotifactionModel.findOne({ user_id });
    }
}
