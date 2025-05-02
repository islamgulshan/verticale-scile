import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashTag } from 'src/models/hashtag';
import { Season } from 'src/models/season';

@Injectable()
export class HashTagService {
  constructor(@InjectModel(HashTag.name) private hashTagModel: Model<Season>) {}

  async create(hash_tag: string) {
    const existing = await this.hashTagModel.findOne({
      hash_tag: { $regex: `^${hash_tag}$`, $options: 'i' },
    });
    if (existing) {
      existing['count'] += 1;
      return await existing.save();
    }

    return this.hashTagModel.create({
      hash_tag,
      count: 1,
    });
  }

  async getAll(): Promise<HashTag[]> {
    return this.hashTagModel.find({});
  }
}
