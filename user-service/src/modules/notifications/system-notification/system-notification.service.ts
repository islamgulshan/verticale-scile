import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SystemNotifaction } from './system.notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class SystemNotificationService {
    constructor(@InjectModel(SystemNotifaction.name) private systemNotifactionModel: Model<SystemNotifaction>) { }

    async create(dto: Partial<SystemNotifaction>): Promise<SystemNotifaction> {
        return this.systemNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }

    async getByUser(user_id: Partial<SystemNotifaction>): Promise<SystemNotifaction> {
        return this.systemNotifactionModel.findOne({ user_id });
    }

}
