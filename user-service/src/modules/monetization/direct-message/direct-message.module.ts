import { Module } from '@nestjs/common';
import { DirectMessageController } from './direct-message.controller';
import { DirectMessageService } from './direct-message.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DirectMessageMonetization,
  DirectMessageMonetizationSchema,
} from './direct-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DirectMessageMonetization.name,
        schema: DirectMessageMonetizationSchema,
      },
    ]),
  ],
  controllers: [DirectMessageController],
  providers: [DirectMessageService],
  exports: [DirectMessageService],
})
export class DirectMessageModule {}
