import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis(); // optionally pass host, port, password, etc.
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
