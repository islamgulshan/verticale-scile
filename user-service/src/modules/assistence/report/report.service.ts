import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AssistenceReport } from './report.schema';
import { Model } from 'mongoose';
import { ReportAssistanceDto } from './dtos/dtos';
import { getPaginationParams, PaginatedResponseDto } from 'src/config/common';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(AssistenceReport.name)
    private AssistenceReportModel: Model<AssistenceReport>,
  ) {}
  async create(dto: Partial<AssistenceReport>): Promise<AssistenceReport> {
    return this.AssistenceReportModel.create({ ...dto });
  }
  async getList(payload: ReportAssistanceDto): Promise<PaginatedResponseDto> {
    const filter = {};
    const { page, limit, skip } = getPaginationParams(
      payload.page,
      payload.limit,
    );
    if (payload.user_id?.trim()) filter['user_id'] = payload.user_id;

    const total = await this.AssistenceReportModel.countDocuments({
      ...filter,
    });
    const data = await this.AssistenceReportModel.find({ ...filter })
      .populate({
        path: 'user_id',
        select: 'user_name email',
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

  async getById(_id: Partial<AssistenceReport>): Promise<AssistenceReport> {
    return this.AssistenceReportModel.findById({ _id }).populate({
      path: 'user_id',
      select: 'user_name email',
    });
  }

  async delete(_id: Partial<AssistenceReport>): Promise<AssistenceReport> {
    return this.AssistenceReportModel.findByIdAndDelete({ _id });
  }
}
