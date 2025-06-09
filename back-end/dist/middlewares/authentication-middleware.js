"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized_error_1 = __importDefault(require("../domain/errors/unauthorized-error"));
// interface AuthenticatedRequest extends Request {
//   auth?: {
//     userId?: string;
//   };
// }
const isAuthenticated = (req, res, next) => {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.auth) === null || _a === void 0 ? void 0 : _a.userId)) {
        throw new unauthorized_error_1.default("Unauthorized: Please Log In");
    }
    next();
};
exports.default = isAuthenticated;
//# sourceMappingURL=authentication-middleware.js.map