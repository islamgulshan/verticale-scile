import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSetting, UserSettingDocument } from './user.setting.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserSettingService {
    constructor(
         @InjectModel(UserSetting.name) private userSettingModel: Model<UserSettingDocument>,
    ){}

    async create(userSettingDto: Partial<UserSetting>): Promise<UserSetting> {
        const newUserSetting = new this.userSettingModel(userSettingDto);
        return newUserSetting.save();
      }


     

    // ✅ Get all UserSettings
    async findAll(): Promise<UserSetting[]> {
        return this.userSettingModel.find().exec();
    }

    // ✅ Get a single UserSetting by ID
    async findById(id: string): Promise<UserSetting> {
        const userSetting = await this.userSettingModel.findById(id).exec();
        if (!userSetting) {
            throw new NotFoundException(`UserSetting with ID "${id}" not found`);
        }
        return userSetting;
    }

    // ✅ Get UserSetting by user_id
    async findByUserId(userId: string): Promise<UserSetting> {
        const userSetting = await this.userSettingModel.findOne({ user_id: userId }).exec();
        if (!userSetting) {
            throw new NotFoundException(`UserSetting for User ID "${userId}" not found`);
        }
        return userSetting;
    }

    // ✅ Update a UserSetting
    async update(id: string, updateUserSettingDto: Partial<UserSetting>): Promise<UserSetting> {
        const updatedUserSetting = await this.userSettingModel.findByIdAndUpdate(
            id,
            updateUserSettingDto,
            { new: true, runValidators: true },
        );
        if (!updatedUserSetting) {
            throw new NotFoundException(`UserSetting with ID "${id}" not found`);
        }
        return updatedUserSetting;
    }

    // ✅ Delete a UserSetting
    async delete(id: string): Promise<boolean> {
        const result = await this.userSettingModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`UserSetting with ID "${id}" not found`);
        }
        return true
    }
}

