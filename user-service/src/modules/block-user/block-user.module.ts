import { Module } from '@nestjs/common';
import { BlockUserController } from './block-user.controller';
import { BlockUserService } from './block-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockUser, BlockUserSchema } from './block-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlockUser.name,
        schema: BlockUserSchema,
      },
    ]),
  ],
  controllers: [BlockUserController],
  providers: [BlockUserService],
})
export class BlockUserModule {}
