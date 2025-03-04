import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TwoFactorAuth } from './two-factor-auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    @InjectModel(TwoFactorAuth.name)
    private TwoFactorAuthModel: Model<TwoFactorAuth>,
  ) {}
  async create(dto: Partial<TwoFactorAuth>): Promise<TwoFactorAuth> {
    const exist = await this.TwoFactorAuthModel.findOne({
      user_id: dto.user_id,
    });
    if (exist)
      throw new ConflictException('Two Factor Authication already exist');
    return this.TwoFactorAuthModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
      { upsert: true },
    );
  }

  async update(dto: Partial<TwoFactorAuth>): Promise<boolean> {
    const exist = await this.TwoFactorAuthModel.findOne({
      user_id: dto.user_id,
    });
    if (dto.pin && exist?.pin !== dto.pin)
      throw new BadRequestException('PIN not match');
    if (dto['new_pin']) {
      dto.pin = dto['new_pin'];
    }
    await this.TwoFactorAuthModel.findOneAndUpdate(
      { user_id: dto.user_id },
      { ...dto },
    );
    return true;
  }
  async getByUser(user_id: Partial<TwoFactorAuth>): Promise<TwoFactorAuth> {
    return this.TwoFactorAuthModel.findOne({ user_id });
  }

  async verify(dto: Partial<TwoFactorAuth>): Promise<boolean> {
    const exist = await this.TwoFactorAuthModel.findOne({
      user_id: dto.user_id,
    });
    if (exist?.pin !== dto.pin) throw new BadRequestException('Pin not match');
    return true;
  }
}
