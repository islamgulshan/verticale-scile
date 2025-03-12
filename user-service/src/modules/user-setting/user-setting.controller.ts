import { Controller } from '@nestjs/common';
import { UserSettingService } from './user-setting.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserSetting } from './user.setting.schema';

@Controller('user-setting')
export class UserSettingController {
  constructor(private userSettingService: UserSettingService) {}

  @MessagePattern('create-update-user-setting')
  async create(
    @Payload() userSettingDto: Partial<UserSetting>,
  ): Promise<UserSetting> {
    return this.userSettingService.create(userSettingDto);
  }

  @MessagePattern('get-user-settings')
  async findAll(): Promise<UserSetting[]> {
    return this.userSettingService.findAll();
  }

  @MessagePattern('get-user-setting')
  async getById(@Payload() id: string): Promise<UserSetting> {
    return this.userSettingService.findById(id);
  }

  @MessagePattern('get-user-setting-by-user')
  async getByUser(@Payload() user_id: string): Promise<UserSetting> {
    return this.userSettingService.findByUserId(user_id);
  }

  @MessagePattern('update-user-setting')
  async update(@Payload() payload: any): Promise<UserSetting> {
    return this.userSettingService.update(payload.user_id, payload);
  }

  @MessagePattern('delete-user-setting')
  async delete(@Payload() user_id: string): Promise<boolean> {
    return this.userSettingService.delete(user_id);
  }

  @MessagePattern('generate-referral')
  generateReferral(@Payload() user_id: Partial<UserSetting>) {
    return this.userSettingService.generateReferral(user_id);
  }
}
