import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  getPagination,
  PaginatedResponse,
  PaginatedResponseType,
} from 'src/common';
import { Season } from 'src/models/season';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(Season.name)
    private SeasonModel: Model<Season>,
  ) {}
  async create(dto: Partial<Season>): Promise<Season> {
    return this.SeasonModel.create(dto);
  }

  async getAll(dto: {
    name: string;
    page?: number;
    limit: number;
  }): Promise<PaginatedResponseType<Season>> {
    const { page, limit, skip } = getPagination(dto.page, dto.limit);
    const filter: any = {};

    if (dto.name?.trim()) {
      filter.name = { $regex: dto.name.trim(), $options: 'i' };
    }

    const [data, total] = await Promise.all([
      this.SeasonModel.find(filter).skip(skip).limit(limit),
      this.SeasonModel.countDocuments(filter),
    ]);

    return PaginatedResponse(data, total, page, limit);
  }

  async getById(id: string): Promise<Season> {
    const data = await this.SeasonModel.findById({ _id: id });
    if (!data) throw new NotFoundException('not found');
    return data;
  }

  async update(id: string, dto: Partial<Season>): Promise<Season> {
    return this.SeasonModel.findByIdAndUpdate({ _id: id }, dto, { new: true });
  }

  async delete(id: string): Promise<Season> {
    const data = await this.SeasonModel.findByIdAndDelete(id);
    if (!data) throw new NotFoundException('not found');
    return data;
  }
}
