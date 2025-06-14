import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { EmbeddingService } from 'src/common/embedding.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, EmbeddingService],
})
export class JobModule {}
