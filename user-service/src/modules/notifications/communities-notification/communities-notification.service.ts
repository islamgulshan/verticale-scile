import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommunitiesNotifaction } from './communities-notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommunitiesNotificationService {
    constructor(@InjectModel(CommunitiesNotifaction.name) private communitiesNotifactionModel: Model<CommunitiesNotifaction>) { }
    async create(dto: Partial<CommunitiesNotifaction>): Promise<CommunitiesNotifaction> {
        return this.communitiesNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }
    async getByUser(user_id: Partial<CommunitiesNotifaction>): Promise<CommunitiesNotifaction> {
        return this.communitiesNotifactionModel.findOne({ user_id });
    }
}
