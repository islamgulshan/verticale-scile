import { Queue } from 'bull';
import { Redis } from 'ioredis';
export declare class MatchService {
    private readonly queue;
    private readonly redisClient;
    constructor(queue: Queue, redisClient: Redis);
    match(jobId: string): Promise<{
        status: string;
    }>;
    getCachedResults(jobId: string): Promise<any>;
}
