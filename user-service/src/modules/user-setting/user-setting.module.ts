import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSetting, UserSettingSchema } from './user.setting.schema';
import { UserSettingController } from './user-setting.controller';
import { UserSettingService } from './user-setting.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserSetting.name, schema: UserSettingSchema }])],
    controllers: [UserSettingController],
    providers:[UserSettingService],
    exports:[UserSettingService]
})
export class UserSettingModule {}
