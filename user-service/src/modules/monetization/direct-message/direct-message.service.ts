import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DirectMessageMonetization } from './direct-message.schema';
import { Model } from 'mongoose';

@Injectable()
export class DirectMessageService {
  constructor(
    @InjectModel(DirectMessageMonetization.name)
    private DirectMessageMonetizationModel: Model<DirectMessageMonetization>,
  ) {}
  async create(
    dto: Partial<DirectMessageMonetization>,
  ): Promise<DirectMessageMonetization> {
    return this.DirectMessageMonetizationModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
  }
  async getByUser(
    user_id: Partial<DirectMessageMonetization>,
  ): Promise<DirectMessageMonetization> {
    return this.DirectMessageMonetizationModel.findOne({ user_id });
  }
}
