import { Module } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TwoFactorAuth, TwoFactorAuthSchema } from './two-factor-auth.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: TwoFactorAuth.name, schema: TwoFactorAuthSchema }])],
  providers: [TwoFactorAuthService],
  controllers: [TwoFactorAuthController],
  exports: [TwoFactorAuthService],

})
export class TwoFactorAuthModule {}
