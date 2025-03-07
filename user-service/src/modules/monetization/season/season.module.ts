import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import {
  SeasonsMonetization,
  SeasonsMonetizationSchema,
} from './season.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SeasonsMonetization.name,
        schema: SeasonsMonetizationSchema,
      },
    ]),
  ],
  providers: [SeasonService],
  controllers: [SeasonController],
  exports: [SeasonService],
})
export class SeasonModule {}
