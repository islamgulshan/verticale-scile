import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AccountMonetizationController } from './account-monetization/account-monetization.controller';
import { ConfigService } from '../services/config/config.service';
import { DirectMessageController } from './direct-message/direct-message.controller';
import { CommentController } from './comment/comment.controller';

@Module({
  controllers: [AccountMonetizationController, DirectMessageController, CommentController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('userService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class MonetizationModule {}
