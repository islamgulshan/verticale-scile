"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToVector = textToVector;
function textToVector(txt, dim = 6) {
    const vals = Array.from({ length: dim }, (_, i) => (txt.charCodeAt(i % txt.length) * 17 + i) % 97);
    const len = Math.hypot(...vals);
    return vals.map((v) => v / len);
}
//# sourceMappingURL=text-to-vector.js.map