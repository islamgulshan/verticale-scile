import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlockUser } from './block-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlockUserService {
  constructor(
    @InjectModel(BlockUser.name)
    private BlockUserModel: Model<BlockUser>,
  ) {}
  async block(dto: Partial<BlockUser>): Promise<BlockUser> {
    return this.BlockUserModel.findOneAndUpdate(
      { user_id: dto['user_id'] },
      { $addToSet: { block_list: dto['block_user'] } },
      { new: true, upsert: true },
    );
  }

  async unblock(dto: Partial<BlockUser>): Promise<BlockUser> {
    return this.BlockUserModel.findOneAndUpdate(
      { user_id: dto['user_id'] },
      { $pull: { block_list: dto['block_user'] } },
      { new: true },
    );
  }

  async getBlockUsers(user_id: string): Promise<BlockUser> {
    return this.BlockUserModel.findOne({ user_id: user_id }).populate({
      path: 'block_list',
      select: 'email name user_name profile',
      populate: {
        path: 'profile',
        select: 'profile_picture',
      },
    });
  }
}
