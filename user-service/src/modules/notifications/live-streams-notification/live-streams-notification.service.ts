import { Injectable } from '@nestjs/common';
import { LiveStreamsNotifaction } from './live-stream-notification.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LiveStreamsNotificationService {
    constructor(@InjectModel(LiveStreamsNotifaction.name) private liveStreamsNotifactionModel: Model<LiveStreamsNotifaction>) { }
    async create(dto: Partial<LiveStreamsNotifaction>): Promise<LiveStreamsNotifaction> {
        return this.liveStreamsNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }
    async getByUser(user_id: Partial<LiveStreamsNotifaction>): Promise<LiveStreamsNotifaction> {
        return this.liveStreamsNotifactionModel.findOne({ user_id });
    }
}

