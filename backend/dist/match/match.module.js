"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const match_service_1 = require("./match.service");
const match_controller_1 = require("./match.controller");
const match_processor_1 = require("./match.processor");
const db_module_1 = require("../db/db.module");
const redis_module_1 = require("../redis.module");
let MatchModule = class MatchModule {
};
exports.MatchModule = MatchModule;
exports.MatchModule = MatchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'match-queue',
            }),
            redis_module_1.RedisModule,
            db_module_1.DbModule,
        ],
        controllers: [match_controller_1.MatchController],
        providers: [match_service_1.MatchService, match_processor_1.MatchProcessor],
    })
], MatchModule);
//# sourceMappingURL=match.module.js.map