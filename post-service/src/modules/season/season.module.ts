import { Module } from '@nestjs/common';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from 'src/models/season';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Season.name,
        schema: SeasonSchema,
      },
    ]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
