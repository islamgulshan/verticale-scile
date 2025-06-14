"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MatchProcessor_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const text_to_vector_1 = require("./../utlis/text-to-vector");
let MatchProcessor = MatchProcessor_1 = class MatchProcessor {
    db;
    redisClient;
    logger = new common_1.Logger(MatchProcessor_1.name);
    constructor(db, redisClient) {
        this.db = db;
        this.redisClient = redisClient;
    }
    async handleMatch(job) {
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
            const embedding = (0, text_to_vector_1.textToVector)(`${jobRow.title} ${jobRow.description}`, 6);
            const embeddingStr = `[${embedding.join(',')}]`;
            const matches = await this.db.query(`
        SELECT id AS "candidateId",
               1 - (embedding <=> $1::vector) AS score
        FROM candidates
        ORDER BY embedding <=> $1::vector
        LIMIT 3
        `, [embeddingStr]);
            this.logger.log(`Top matches for job ${jobId}:`);
            matches.rows.forEach((row) => this.logger.log(`Candidate: ${row.candidateId}, Score: ${row.score.toFixed(4)}`));
            await this.redisClient.set(`matches:${jobId}`, JSON.stringify(matches.rows), 'EX', 60 * 5);
            return matches.rows;
        }
        catch (err) {
            this.logger.error('Error processing match job:', err);
        }
    }
};
exports.MatchProcessor = MatchProcessor;
__decorate([
    (0, bull_1.Process)('match-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatchProcessor.prototype, "handleMatch", null);
exports.MatchProcessor = MatchProcessor = MatchProcessor_1 = __decorate([
    (0, bull_1.Processor)('match-queue'),
    __param(0, (0, common_1.Inject)('PG_POOL')),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Pool !== "undefined" && pg_1.Pool) === "function" ? _a : Object, Object])
], MatchProcessor);
//# sourceMappingURL=match.processor.js.map