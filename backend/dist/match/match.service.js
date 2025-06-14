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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const ioredis_1 = require("ioredis");
let MatchService = class MatchService {
    queue;
    redisClient;
    constructor(queue, redisClient) {
        this.queue = queue;
        this.redisClient = redisClient;
    }
    async match(jobId) {
        await this.queue.add('match-job', { jobId });
        return { status: 'job enqueued' };
    }
    async getCachedResults(jobId) {
        const raw = await this.redisClient.get(`matches:${jobId}`);
        if (!raw) {
            return [];
        }
        return JSON.parse(raw);
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('match-queue')),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [Object, ioredis_1.Redis])
], MatchService);
//# sourceMappingURL=match.service.js.map