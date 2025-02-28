import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';
// import { CreateProfileDto, UpdateProfileDto } from './dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async create(createProfileDto: Partial<Profile>): Promise<Profile> {
    const profile = new this.profileModel(createProfileDto);
    return profile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id).exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(user_id: string, updateProfileDto: Partial<Profile>): Promise<Profile> {
    console.log(updateProfileDto,"updateProfileDto")
    const updatedProfile = await this.profileModel.findOneAndUpdate({user_id:user_id}, {$set:{...updateProfileDto}}, { new: true ,upsert:true});
    if (!updatedProfile) {
      throw new NotFoundException(`Profile with not found`);
    }
    return updatedProfile;
  }

  async uploadProfilePicture(user_id: string, updateProfileDto: Partial<Profile>): Promise<Profile> {
    const { profile_picture } = updateProfileDto;
  
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { user_id },
      {
        $setOnInsert: { user_id }, // Agar naye profile ke liye create ho raha hai
        $push: { profile_pictures_list: profile_picture },
        profile_picture
      },
      { new: true, upsert: true }
    );
  
    if (!updatedProfile) {
      throw new NotFoundException(`Profile not found`);
    }
  
    return updatedProfile;
  }
  
  async uploadCoverPicture(user_id: string, updateProfileDto: Partial<Profile>): Promise<Profile> {
    const { cover_picture } = updateProfileDto;
  
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { user_id },
      {
        $setOnInsert: { user_id }, // Agar naye profile ke liye create ho raha hai
        $push: { cover_pictures_list: cover_picture },
        cover_picture,
      },
      { new: true, upsert: true }
    );
  
    if (!updatedProfile) {
      throw new NotFoundException(`Profile not found`);
    }
  
    return updatedProfile;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.profileModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return { message: 'Profile deleted successfully' };
  }
}
