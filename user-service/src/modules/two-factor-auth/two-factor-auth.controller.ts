import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { TwoFactorAuth } from './two-factor-auth.schema';

@Controller('two-factor-auth')
export class TwoFactorAuthController {
  constructor(private readonly quickSettingsService: TwoFactorAuthService) {}
  @MessagePattern('create-two-factor')
  create(@Payload() dto: Partial<TwoFactorAuth>) {
    return this.quickSettingsService.create(dto);
  }
  @MessagePattern('user-two-factor')
  getByUser(@Payload() user_id: Partial<TwoFactorAuth>) {
    return this.quickSettingsService.getByUser(user_id);
  }

  @MessagePattern('update-two-factor')
  update(@Payload() dto: Partial<TwoFactorAuth>) {
    return this.quickSettingsService.update(dto);
  }
  @MessagePattern('verify-two-factor')
  verify(@Payload() dto: Partial<TwoFactorAuth>) {
    return this.quickSettingsService.verify(dto);
  }
}
