import { Module } from '@nestjs/common';
import { DirectMessageModule } from './direct-message/direct-message.module';
import { AccountMonetizationModule } from './account-monetization/account-monetization.module';
import { CommentModule } from './comment/comment.module';
import { SeasonModule } from './season/season.module';
import { LiveSettingsModule } from './live-settings/live-settings.module';

@Module({
  imports: [
    DirectMessageModule,
    AccountMonetizationModule,
    CommentModule,
    SeasonModule,
    LiveSettingsModule,
  ],
})
export class MonetizationModule {}
