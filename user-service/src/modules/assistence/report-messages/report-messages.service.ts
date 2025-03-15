import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReportMessages } from './report-messages.schema';
import { Model } from 'mongoose';
import { ReportMessageDto } from './dto';
import {
  getPaginationParams,
  PaginatedResponseDto,
} from 'src/constants/common';

@Injectable()
export class ReportMessagesService {
  constructor(
    @InjectModel(ReportMessages.name)
    private ReportMessagesModel: Model<ReportMessages>,
  ) {}
  async message(dto: Partial<ReportMessages>): Promise<ReportMessages> {
    return this.ReportMessagesModel.create({ ...dto });
  }

  async getUserChat(payload: ReportMessageDto): Promise<PaginatedResponseDto> {
    const filter = { user_id: payload.user_id };
    const { page, limit, skip } = getPaginationParams(
      payload.page,
      payload.limit,
    );
    const total = await this.ReportMessagesModel.countDocuments({
      ...filter,
    });
    const data = await this.ReportMessagesModel.find({ ...filter })
      .populate({
        path: 'message_sender',
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

  async adminReply(dto: Partial<ReportMessages>): Promise<ReportMessages> {
    return this.ReportMessagesModel.create({ ...dto });
  }
}
