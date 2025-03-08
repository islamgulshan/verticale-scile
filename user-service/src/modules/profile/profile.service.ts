import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';
import { ProfileCoverEmpty } from './dtos';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private userService: UserService,
  ) {}

  async create(createProfileDto: Partial<Profile>): Promise<Profile> {
    const profile = new this.profileModel(createProfileDto);
    this.userService.update(profile['user_id'].toString(), {
      profile: profile._id,
    } as any);
    return profile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel
      .findById(id)
      .populate({ path: 'user_id', select: 'user_name email createdAt' })
      .exec();
    if (!profile) {
      throw new NotFoundException(`Profile not found`);
    }
    return profile;
  }

  async getByUser(user_id: string): Promise<Profile> {
    const profile = await this.profileModel
      .findOne({ user_id })
      .populate({ path: 'user_id', select: 'user_name email createdAt' })
      .exec();
    if (!profile) {
      throw new NotFoundException(`Profile not found`);
    }
    return profile;
  }

  async update(
    user_id: string,
    updateProfileDto: Partial<Profile>,
  ): Promise<Profile> {
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { user_id: user_id },
      { $set: { ...updateProfileDto } },
      { new: true, upsert: true },
    );
    if (!updatedProfile) {
      throw new NotFoundException(`Profile with not found`);
    }
    this.userService.update(updatedProfile['user_id'].toString(), {
      profile: updatedProfile._id,
    } as any);
    return updatedProfile;
  }

  async uploadProfilePicture(
    user_id: string,
    updateProfileDto: Partial<Profile>,
  ): Promise<Profile> {
    const { profile_picture } = updateProfileDto;

    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { user_id },
      {
        $setOnInsert: { user_id }, // Agar naye profile ke liye create ho raha hai
        $push: { profile_pictures_list: profile_picture },
        profile_picture,
      },
      { new: true, upsert: true },
    );

    if (!updatedProfile) {
      throw new NotFoundException(`Profile not found`);
    }
    this.userService.update(updatedProfile['user_id'].toString(), {
      profile: updatedProfile._id,
    } as any);

    return updatedProfile;
  }

  async uploadCoverPicture(
    user_id: string,
    updateProfileDto: Partial<Profile>,
  ): Promise<Profile> {
    const { cover_picture } = updateProfileDto;

    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { user_id },
      {
        $setOnInsert: { user_id }, // Agar naye profile ke liye create ho raha hai
        $push: { cover_pictures_list: cover_picture },
        cover_picture,
      },
      { new: true, upsert: true },
    );

    if (!updatedProfile) {
      throw new NotFoundException(`Profile not found`);
    }
    this.userService.update(updatedProfile['user_id'].toString(), {
      profile: updatedProfile._id,
    } as any);
    return updatedProfile;
  }

  async remove(user_id: string): Promise<{ message: string }> {
    const result = await this.profileModel.findOneAndDelete({ user_id });
    if (!result) {
      throw new NotFoundException(`Profile  not found`);
    }
    this.userService.update(result['user_id']?.toString(), {
      profile: null,
    } as any);
    return { message: 'Profile deleted successfully' };
  }

  async setProfileCoverPicture(
    user_id: string,
    updateProfileDto: Partial<Profile>,
  ): Promise<Profile> {
    const setData = {};
    if (updateProfileDto?.profile_picture) {
      setData['profile_picture'] = updateProfileDto?.profile_picture;
    }
    if (updateProfileDto?.cover_picture) {
      setData['cover_picture'] = updateProfileDto?.cover_picture;
    }
    return this.profileModel.findByIdAndUpdate(
      { user_id: user_id },
      { ...setData },
      { new: true },
    );
  }

  async removeProfileCoverPicture(
    user_id: string,
    updateProfileDto: Partial<Profile>,
  ): Promise<Profile> {
    const data = await this.profileModel.findOne({ user_id: user_id });
    if (updateProfileDto?.profile_picture) {
      data['profile_pictures_list'] = data?.profile_pictures_list?.filter(
        (x) => x != updateProfileDto.profile_picture,
      );
      if (updateProfileDto.profile_picture == data.profile_picture) {
        data.profile_picture = null;
      }
    }
    if (updateProfileDto?.cover_picture) {
      data['cover_pictures_list'] = data?.cover_pictures_list?.filter(
        (x) => x != updateProfileDto.cover_picture,
      );
      if (updateProfileDto.cover_picture == data.cover_picture) {
        data.cover_picture = null;
      }
    }
    await data.save();
    return data;
  }

  async profileCoverEmpty(
    user_id: string,
    dto: ProfileCoverEmpty,
  ): Promise<Profile> {
    const data = await this.profileModel.findOne({ user_id: user_id });
    if (dto?.is_profile) {
      data['profile_pictures_list'] = [];
      data.profile_picture = null;
    }
    if (dto?.is_cover) {
      data['cover_pictures_list'] = [];
      data.cover_picture = null;
    }
    await data.save();
    return data;
  }
}
