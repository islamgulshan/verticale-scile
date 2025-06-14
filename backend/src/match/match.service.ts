import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Redis } from 'ioredis';

@Injectable()
export class MatchService {
  constructor(
    @InjectQueue('match-queue') private readonly queue: Queue,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async match(jobId: string) {
    await this.queue.add('match-job', { jobId });
    return { status: 'job enqueued' };
  }

  async getCachedResults(jobId: string) {
    const raw = await this.redisClient.get(`matches:${jobId}`);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  }
}
