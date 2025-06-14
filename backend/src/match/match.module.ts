// src/match/match.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MatchProcessor } from './match.processor';
import { DbModule } from '../db/db.module';
import { RedisModule } from 'src/redis.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'match-queue',
    }),
    RedisModule,
    DbModule,
  ],
  controllers: [MatchController],
  providers: [MatchService, MatchProcessor],
})
export class MatchModule {}
