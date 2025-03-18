import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SecurityStatus } from './security-status.schema';
import { Model } from 'mongoose';

@Injectable()
export class SecurityStatusService {
  constructor(
    @InjectModel(SecurityStatus.name)
    private SecurityStatusModel: Model<SecurityStatus>,
  ) {}
  async create(dto: Partial<SecurityStatus>): Promise<SecurityStatus> {
    console.log(dto);
    return this.SecurityStatusModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { upsert: true, new: true },
    );
  }
  async get(user_id: string): Promise<SecurityStatus> {
    return this.SecurityStatusModel.findOne({ user_id: user_id });
  }
}
