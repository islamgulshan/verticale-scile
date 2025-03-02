import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsNotifaction } from './post-notifcations.schema';

@Injectable()
export class PostsNotificationService {
    constructor(@InjectModel(PostsNotifaction.name) private PostsNotifactionModel: Model<PostsNotifaction>) { }
    async create(dto: Partial<PostsNotifaction>): Promise<PostsNotifaction> {
        return this.PostsNotifactionModel.findOneAndUpdate({ user_id: dto.user_id }, { ...dto }, { new: true, upsert: true });
    }
    async getByUser(user_id: Partial<PostsNotifaction>): Promise<PostsNotifaction> {
        return this.PostsNotifactionModel.findOne({ user_id });
    }
}
