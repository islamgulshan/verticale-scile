import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('create-profile')
  create(@Payload() createProfileDto: Partial<Profile>) {
    return this.profileService.create(createProfileDto);
  }

  @MessagePattern('get-profiles')
  findAll() {
    return this.profileService.findAll();
  }

  @MessagePattern('get-profile')
  findOne(@Payload() id: string) {
    return this.profileService.findOne(id);
  }
  @MessagePattern('update-profile')
  updateProfile(@Payload() data: { user_id: string; updateProfileDto: Partial<Profile> }) {
    return this.profileService.update(data.user_id, data.updateProfileDto);
  }
  @MessagePattern('update-profile-picture')
  updateProfilePicture(@Payload() data: { user_id: string; updateProfileDto: Partial<Profile> }) {
    return this.profileService.uploadProfilePicture(data.user_id, data?.updateProfileDto);
  }

  @MessagePattern('update-cover-picture')
  updateCoverPicture(@Payload() data: { user_id: string; updateProfileDto: Partial<Profile> }) {
    return this.profileService.uploadCoverPicture(data.user_id, data?.updateProfileDto);
  }
  
  @MessagePattern('delete-profile')
  remove(@Payload() id: string) {
    return this.profileService.remove(id);
  }
}
