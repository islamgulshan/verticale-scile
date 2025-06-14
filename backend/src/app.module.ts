import { Module } from '@nestjs/common';
import { EmbeddingService } from './common/embedding.service';
import { HealthController } from './health/health.controller';
import { BullModule } from '@nestjs/bull';
import { MatchModule } from './match/match.module';
import { JobModule } from './jobs/job.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    JobModule,
    DbModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
        password: process.env.REDIS_PASSWORD,
      },
    }),

    MatchModule,
  ],
  controllers: [HealthController],
  providers: [EmbeddingService],
})
export class AppModule {}
