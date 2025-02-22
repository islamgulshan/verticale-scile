import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Otp, OtpSchema } from './otp.schema';
import { EmailModule } from '../email/email.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
  EmailModule
],
  controllers: [UserController],
  providers:[UserService],
  exports:[UserService]
})
export class UserModule {}
