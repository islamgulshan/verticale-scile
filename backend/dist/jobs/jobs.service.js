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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const embedding_service_1 = require("../common/embedding.service");
const database_1 = require("../database");
let JobsService = class JobsService {
    embedding;
    constructor(embedding) {
        this.embedding = embedding;
    }
    async create(createJobDto) {
        const { id, title, description } = createJobDto;
        const vecArray = this.embedding.textToVector(description);
        const vecLiteral = `[${vecArray.join(',')}]`;
        await database_1.pool.query(`
      INSERT INTO jobs (id, title, description, embedding)
      VALUES ($1, $2, $3, $4::vector)
      `, [id, title, description, vecLiteral]);
        return { status: 'saved' };
    }
    async list() {
        const res = await database_1.pool.query('SELECT id, title FROM jobs');
        return res.rows;
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [embedding_service_1.EmbeddingService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map