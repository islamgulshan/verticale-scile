"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const embedding_service_1 = require("./common/embedding.service");
const health_controller_1 = require("./health/health.controller");
const bull_1 = require("@nestjs/bull");
const match_module_1 = require("./match/match.module");
const job_module_1 = require("./jobs/job.module");
const db_module_1 = require("./db/db.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            job_module_1.JobModule,
            db_module_1.DbModule,
            bull_1.BullModule.forRoot({
                redis: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
                    password: process.env.REDIS_PASSWORD,
                },
            }),
            match_module_1.MatchModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [embedding_service_1.EmbeddingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map