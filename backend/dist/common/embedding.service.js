"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingService = void 0;
const common_1 = require("@nestjs/common");
let EmbeddingService = class EmbeddingService {
    textToVector(txt = '', dim = 6) {
        if (typeof txt !== 'string') {
            throw new common_1.BadRequestException('Invalid text provided for embedding.');
        }
        if (txt.length === 0) {
            return Array(dim).fill(0);
        }
        const vals = Array.from({ length: dim }, (_, i) => (txt.charCodeAt(i % txt.length) * 17 + i) % 97);
        const len = Math.hypot(...vals);
        return vals.map((v) => v / len);
    }
};
exports.EmbeddingService = EmbeddingService;
exports.EmbeddingService = EmbeddingService = __decorate([
    (0, common_1.Injectable)()
], EmbeddingService);
//# sourceMappingURL=embedding.service.js.map