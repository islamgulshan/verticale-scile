import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Inject, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { textToVector } from './../utlis/text-to-vector';

@Processor('match-queue')
export class MatchProcessor {
  private readonly logger = new Logger(MatchProcessor.name);

  constructor(
    @Inject('PG_POOL') private readonly db: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: any, // Redis client injected
  ) {}

  @Process('match-job')
  async handleMatch(job: Job<{ jobId: string }>) {
    const { jobId } = job.data;
    this.logger.log(`Processing match for job ${jobId}`);

    try {
      const result = await this.db.query('SELECT * FROM jobs WHERE id = $1', [
        jobId,
      ]);
      const jobRow = result.rows[0];

      if (!jobRow) {
        this.logger.warn(`Job not found: ${jobId}`);
        return;
      }

      const embedding = textToVector(
        `${jobRow.title} ${jobRow.description}`,
        6,
      );
      const embeddingStr = `[${embedding.join(',')}]`;

      const matches = await this.db.query(
        `
        SELECT id AS "candidateId",
               1 - (embedding <=> $1::vector) AS score
        FROM candidates
        ORDER BY embedding <=> $1::vector
        LIMIT 3
        `,
        [embeddingStr],
      );

      this.logger.log(`Top matches for job ${jobId}:`);
      matches.rows.forEach((row) =>
        this.logger.log(
          `Candidate: ${row.candidateId}, Score: ${row.score.toFixed(4)}`,
        ),
      );

      await this.redisClient.set(
        `matches:${jobId}`,
        JSON.stringify(matches.rows),
        'EX',
        60 * 5,
      );

      return matches.rows;
    } catch (err) {
      this.logger.error('Error processing match job:', err);
    }
  }
}
