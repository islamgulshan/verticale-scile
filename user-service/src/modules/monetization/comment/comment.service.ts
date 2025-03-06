import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentMonetization } from './comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentMonetization.name)
    private CommentMonetizationModel: Model<CommentMonetization>,
  ) {}
  async create(
    dto: Partial<CommentMonetization>,
  ): Promise<CommentMonetization> {
    return this.CommentMonetizationModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { new: true, upsert: true },
    );
  }
  async getByUser(
    user_id: Partial<CommentMonetization>,
  ): Promise<CommentMonetization> {
    return this.CommentMonetizationModel.findOne({ user_id });
  }
}
