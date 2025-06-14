import { EmbeddingService } from 'src/common/embedding.service';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobsService {
    private readonly embedding;
    constructor(embedding: EmbeddingService);
    create(createJobDto: CreateJobDto): Promise<{
        status: string;
    }>;
    list(): Promise<any>;
}
