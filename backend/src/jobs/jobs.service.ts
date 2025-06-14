import { Injectable } from '@nestjs/common';
import { EmbeddingService } from 'src/common/embedding.service';
import { CreateJobDto } from './dto/create-job.dto';
import { pool } from '../database'; // adjust path as needed

@Injectable()
export class JobsService {
  constructor(private readonly embedding: EmbeddingService) {}

  async create(createJobDto: CreateJobDto) {
    const { id, title, description } = createJobDto;
    const vecArray = this.embedding.textToVector(description);
    const vecLiteral = `[${vecArray.join(',')}]`;
    await pool.query(
      `
      INSERT INTO jobs (id, title, description, embedding)
      VALUES ($1, $2, $3, $4::vector)
      `,
      [id, title, description, vecLiteral],
    );

    return { status: 'saved' };
  }

  async list() {
    const res = await pool.query('SELECT id, title FROM jobs');
    return res.rows;
  }
}
