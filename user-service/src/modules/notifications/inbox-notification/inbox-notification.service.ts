import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InboxNotifaction } from './inbox-notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class InboxNotificationService {
    constructor(@InjectModel(InboxNotifaction.name) private inboxNotifactionModel: Model<InboxNotifaction>) { }
    async create(dto: Partial<InboxNotifaction>): Promise<InboxNotifaction> {
        return this.inboxNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }
    async getByUser(user_id: Partial<InboxNotifaction>): Promise<InboxNotifaction> {
        return this.inboxNotifactionModel.findOne({ user_id });
    }
}
