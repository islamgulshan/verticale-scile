import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SeasonsMonetization } from './season.schema';
import { Model } from 'mongoose';
import { SeasonDto } from './dtos/dtos';
import {
  getPaginationParams,
  PaginatedResponseDto,
} from 'src/constants/common';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(SeasonsMonetization.name)
    private SeasonsMonetizationModel: Model<SeasonsMonetization>,
  ) {}
  async create(
    dto: Partial<SeasonsMonetization>,
  ): Promise<SeasonsMonetization> {
    return this.SeasonsMonetizationModel.create({ ...dto });
  }
  async getList(payload: SeasonDto): Promise<PaginatedResponseDto> {
    console.log(payload, 'payloads');
    const filter = {};
    const { page, limit, skip } = getPaginationParams(
      payload.page,
      payload.limit,
    );
    if (payload.user_id?.trim()) filter['user_id'] = payload.user_id;
    if (typeof payload.premium_monetization === 'boolean') {
      filter['premium_monetization'] = payload.premium_monetization;
    } else if (typeof payload.premium_monetization === 'string') {
      const parsedValue = JSON.parse(payload.premium_monetization);
      if (typeof parsedValue === 'boolean') {
        filter['premium_monetization'] = parsedValue;
      }
    }
    const total = await this.SeasonsMonetizationModel.countDocuments({
      ...filter,
    });
    const data = await this.SeasonsMonetizationModel.find({ ...filter })
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

  async getById(id: string): Promise<SeasonsMonetization | null> {
    return this.SeasonsMonetizationModel.findById(id).exec();
  }

  async update(
    id: string,
    dto: Partial<SeasonsMonetization>,
  ): Promise<SeasonsMonetization | null> {
    return this.SeasonsMonetizationModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<SeasonsMonetization | null> {
    return this.SeasonsMonetizationModel.findByIdAndDelete(id).exec();
  }
}
