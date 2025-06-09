"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHelpDTO = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createHelpDTO = zod_1.default.object({
    name: zod_1.default.string().min(2, "Name must be at least 2 characters."),
    email: zod_1.default.string().email("Please enter a valid email."),
    subject: zod_1.default.string().min(3, "Topic is required."),
    message: zod_1.default.string().min(10, "Message must be at least 10 characters."),
});
//# sourceMappingURL=help.js.map