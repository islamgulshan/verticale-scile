import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RelationsNotifaction } from './relation.notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class RelationsNotificationService {
    constructor(@InjectModel(RelationsNotifaction.name) private relationsNotifactionModel: Model<RelationsNotifaction>) { }
    async create(dto: Partial<RelationsNotifaction>): Promise<RelationsNotifaction> {
        return this.relationsNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }
    async getByUser(user_id: Partial<RelationsNotifaction>): Promise<RelationsNotifaction> {
        return this.relationsNotifactionModel.findOne({ user_id });
    }
}
