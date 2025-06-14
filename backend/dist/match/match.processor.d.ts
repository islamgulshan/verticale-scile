import { Job } from 'bull';
import { Pool } from 'pg';
export declare class MatchProcessor {
    private readonly db;
    private readonly redisClient;
    private readonly logger;
    constructor(db: Pool, redisClient: any);
    handleMatch(job: Job<{
        jobId: string;
    }>): Promise<any>;
}
