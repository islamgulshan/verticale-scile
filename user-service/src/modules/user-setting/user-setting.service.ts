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
        const exist=await  this.userSettingModel.findOne({user_id:userSettingDto.user_id})
        if(exist){
            throw new Error(`UserSetting already exist`);
        }
        const newUserSetting = new this.userSettingModel(userSettingDto);
        return newUserSetting.save();
      }


     

    // ✅ Get all UserSettings
    async findAll(): Promise<UserSetting[]> {
        return this.userSettingModel.find().populate({path:"user_id",select:"email user_name"}).exec();
    }

    // ✅ Get a single UserSetting by ID
    async findById(id: string): Promise<UserSetting> {
        const userSetting = await this.userSettingModel.findById(id).populate({path:"user_id",select:"email user_name"}).exec();
        if (!userSetting) {
            throw new NotFoundException(`UserSetting with ID "${id}" not found`);
        }
        return userSetting;
    }

    // ✅ Get UserSetting by user_id
    async findByUserId(userId: string): Promise<UserSetting> {
        const userSetting = await this.userSettingModel.findOne({ user_id: userId }).populate({path:"user_id",select:"email user_name"}).exec();
        if (!userSetting) {
            throw new NotFoundException(`UserSetting for User ID "${userId}" not found`);
        }
        return userSetting;
    }

    // ✅ Update a UserSetting
    async update(user_id: string, updateUserSettingDto: Partial<UserSetting>): Promise<UserSetting> {
        const updatedUserSetting = await this.userSettingModel.findOneAndUpdate(
            {user_id:user_id},
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
        const result = await this.userSettingModel.findOneAndDelete({user_id});
        if (!result) {
            throw new NotFoundException(`UserSetting not found`);
        }
        return true
    }
}

