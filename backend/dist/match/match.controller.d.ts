import { MatchService } from './match.service';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    getMatches(jobId: string): Promise<{
        status: string;
    }>;
    getMatchResults(jobId: string): Promise<any>;
}
