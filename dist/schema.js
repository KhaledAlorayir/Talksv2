"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinSchema = void 0;
const zod_1 = require("zod");
exports.joinSchema = zod_1.z.object({
    subject: zod_1.z.string().trim().toLowerCase().min(1).max(255),
});
