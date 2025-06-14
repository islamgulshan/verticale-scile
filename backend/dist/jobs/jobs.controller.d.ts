import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobsController {
    private readonly jobService;
    constructor(jobService: JobsService);
    create(dto: CreateJobDto): Promise<{
        status: string;
    }>;
    getAll(): Promise<CreateJobDto[]>;
}
