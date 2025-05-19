import { ConflictException, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { getUsersDto } from './dtos';
import { User } from './user.schema';
import { LoginDetail } from './login-details.schema';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}
  @MessagePattern('get-user-by-id')
  async getUserById(@Payload() id: string) {
    return await this.usersService.getById(id);
  }

  @MessagePattern('get-otp')
  async getOtp(@Payload() dto: { email: string; type: string }) {
    return await this.usersService.getOtp(dto);
  }

  @MessagePattern('reset-password')
  async resetPassord(@Payload() payload: any) {
    return await this.usersService.resetPassword(payload);
  }

  @MessagePattern('update-user')
  async update(@Payload() payload: any) {
    return await this.usersService.update(payload.id, payload);
  }

  @MessagePattern('get-users')
  async findAll(@Payload() args: getUsersDto) {
    return await this.usersService.findAll(args.search, args.page, args.limit);
  }
  @MessagePattern('get-user')
  async get(@Payload() id: string): Promise<User> {
    return await this.usersService.getById(id);
  }

  @MessagePattern('delete-user')
  async delete(@Payload() id: string): Promise<User> {
    return await this.usersService.delete(id);
  }

  @MessagePattern('change-password')
  async changePassword(@Payload() payload: Partial<User>): Promise<boolean> {
    return await this.usersService.changePassword(payload);
  }

  @MessagePattern('verify-password')
  async verifyPassword(@Payload() payload: Partial<User>): Promise<boolean> {
    return await this.usersService.verifyPassword(payload);
  }

  @MessagePattern('login-user-detail')
  async LoginDetails(@Payload() user_id: string): Promise<LoginDetail[]> {
    return await this.usersService.LoginDetails(user_id);
  }
  @MessagePattern('check-username')
  async checkUserName(@Payload() user_name: string): Promise<Boolean> {
    const trimmedUsername = user_name?.trim().replace(/\s+/g, '');
    const exist = await this.usersService.findOne({
      user_name: {
        $regex: new RegExp(`^${trimmedUsername}$`, 'i'),
      },
    });
    if (exist) throw new ConflictException('user name already exist');
    return true;
  }
}
