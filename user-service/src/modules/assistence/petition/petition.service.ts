import { Injectable } from '@nestjs/common';
import { AssistencePetition } from './petition.schema';
import { model, Model } from 'mongoose';
import { PetitionAssistanceDto } from './dtos/dtos';
import {
  getPaginationParams,
  PaginatedResponseDto,
} from 'src/constants/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PetitionService {
  constructor(
    @InjectModel(AssistencePetition.name)
    private AssistencePetitionModel: Model<AssistencePetition>,
  ) {}
  async create(dto: Partial<AssistencePetition>): Promise<AssistencePetition> {
    return this.AssistencePetitionModel.create({ ...dto });
  }
  async getList(payload: PetitionAssistanceDto): Promise<PaginatedResponseDto> {
    const filter = {};
    const { page, limit, skip } = getPaginationParams(
      payload.page,
      payload.limit,
    );
    if (payload.date) {
      const date = new Date(payload.date);
      if (!isNaN(date.getTime())) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        filter['createdAt'] = { $gte: startOfMonth, $lt: endOfMonth };
      }
    }

    const total = await this.AssistencePetitionModel.countDocuments({
      ...filter,
    });
    const data = await this.AssistencePetitionModel.find({ ...filter })
      .populate({
        path: 'creator',
        select: 'user_name email profile',
        populate: {
          path: 'profile',
          select: 'profile_picture',
        },
      })
      .skip(skip)
      .limit(limit)
      .exec();
    return {
      data,
      page,
      limit,
      total,
    };
  }

  async getById(_id: Partial<AssistencePetition>): Promise<AssistencePetition> {
    return this.AssistencePetitionModel.findById({ _id }).populate({
      path: 'creator',
      select: 'user_name email profile',
      populate: {
        path: 'profile',
        select: 'profile_picture',
      },
    });
  }

  async support(
    payload: Partial<AssistencePetition>,
  ): Promise<AssistencePetition> {
    console.log(payload, 'service');
    return this.AssistencePetitionModel.findByIdAndUpdate(
      { _id: payload.id },
      { $addToSet: { supporters: payload['user_id'] } },
      { new: true },
    );
  }

  async getSupporters(
    id: Partial<AssistencePetition>,
  ): Promise<AssistencePetition> {
    console.log(id);
    return this.AssistencePetitionModel.findById(id).populate([
      {
        path: 'creator',
        select: 'user_name email profile',
        populate: {
          path: 'profile',
          select: 'profile_picture',
        },
      },
      {
        path: 'supporters',
        select: 'user_name email profile',
        populate: {
          path: 'profile',
          select: 'profile_picture',
        },
      },
    ]);
  }

  async delete(_id: Partial<AssistencePetition>): Promise<AssistencePetition> {
    return this.AssistencePetitionModel.findByIdAndDelete({ _id });
  }
}
