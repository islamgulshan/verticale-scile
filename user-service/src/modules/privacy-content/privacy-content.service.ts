import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PrivacyContent } from './privacy-content-schema';
import { Model } from 'mongoose';

@Injectable()
export class PrivacyContentService {
  constructor(
    @InjectModel(PrivacyContent.name)
    private PrivacyContentModel: Model<PrivacyContent>,
  ) {}
  async create(dto: Partial<PrivacyContent>): Promise<PrivacyContent> {
    return this.PrivacyContentModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
  }
  async getByUser(user_id: Partial<PrivacyContent>): Promise<PrivacyContent> {
    return this.PrivacyContentModel.findOne({ user_id });
  }
}
