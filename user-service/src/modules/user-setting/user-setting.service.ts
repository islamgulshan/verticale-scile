import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSetting, UserSettingDocument } from './user.setting.schema';
import { Model } from 'mongoose';
import { ReferralActionEnum } from 'src/constants/common';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectModel(UserSetting.name)
    private userSettingModel: Model<UserSettingDocument>,
  ) {}

  async create(userSettingDto: Partial<UserSetting>): Promise<UserSetting> {
    const exist = await this.userSettingModel.findOne({
      user_id: userSettingDto.user_id,
    });
    if (exist?.monetization?.driving_license) {
      userSettingDto.monetization['driving_license'] =
        exist.monetization.driving_license;
    }
    //update /create  //generate radeem
    return this.userSettingModel.findOneAndUpdate(
      { user_id: userSettingDto.user_id },
      { $set: { ...userSettingDto } },
      { new: true, upsert: true },
    );
  }

  // ✅ Get all UserSettings
  async findAll(): Promise<UserSetting[]> {
    return this.userSettingModel
      .find()
      .populate({ path: 'user_id', select: 'email user_name' })
      .exec();
  }

  // ✅ Get a single UserSetting by ID
  async findById(id: string): Promise<UserSetting> {
    const userSetting = await this.userSettingModel
      .findById(id)
      .populate({ path: 'user_id', select: 'email user_name' })
      .exec();
    if (!userSetting) {
      throw new NotFoundException(`UserSetting with ID "${id}" not found`);
    }
    return userSetting;
  }

  // ✅ Get UserSetting by user_id
  async findByUserId(userId: string): Promise<UserSetting> {
    const userSetting = await this.userSettingModel
      .findOne({ user_id: userId })
      .populate({ path: 'user_id', select: 'email user_name' })
      .exec();
    if (!userSetting) {
      throw new NotFoundException(
        `UserSetting for User ID "${userId}" not found`,
      );
    }
    return userSetting;
  }

  // ✅ Update a UserSetting
  async update(
    user_id: string,
    updateUserSettingDto: Partial<UserSetting>,
  ): Promise<UserSetting> {
    const updatedUserSetting = await this.userSettingModel.findOneAndUpdate(
      { user_id: user_id },
      updateUserSettingDto,
      { new: true, runValidators: true },
    );
    if (!updatedUserSetting) {
      throw new NotFoundException(`UserSetting not found`);
    }
    return updatedUserSetting;
  }

  // ✅ Delete a UserSetting
  async delete(user_id: string): Promise<boolean> {
    const result = await this.userSettingModel.findOneAndDelete({ user_id });
    if (!result) {
      throw new NotFoundException(`UserSetting not found`);
    }
    return true;
  }

  async generateReferral(user_id: Partial<UserSetting>): Promise<string> {
    const data = await this.userSettingModel
      .findOne({ user_id })
      .populate({ path: 'user_id', select: 'user_name email' });
    if (!data) throw new BadRequestException('first create user setting');

    if (!data?.referral?.action)
      throw new BadRequestException(
        'You can generate referral when you choose action' +
          ReferralActionEnum.GENERATE_CODE,
      );

    if (data.referral.action != ReferralActionEnum.GENERATE_CODE) {
      throw new BadRequestException(
        'You can generate referral when you choose action' +
          ReferralActionEnum.GENERATE_CODE,
      );
    }
    if (!data['user_id']['user_name']) {
      data['user_id']['user_name'] = data['user_id']['email']?.split('@')[0];
    }
    const randomString = Math.random().toString(36).substring(2, 7);
    return `${data['user_id']['user_name']?.trim()?.replace(' ', '.')}/@${randomString}`;
  }

  async uploadDrivingLicense(
    userSettingDto: Partial<UserSetting>,
  ): Promise<UserSetting> {
    const data = await this.userSettingModel.findOne({
      user_id: userSettingDto.user_id,
    });
    if (!data) throw new BadRequestException('First create user settings');
    data['monetization'].driving_license = userSettingDto['driving_license'];
    await data.save();
    return data;
  }
}
