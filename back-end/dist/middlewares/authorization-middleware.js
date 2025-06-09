"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forbidden_error_1 = require("../domain/errors/forbidden-error");
// interface AuthenticatedRequest extends Request {
//   auth?: {
//     sessionClaims?: { metadata?: { role: "admin" } };
//   };
// }
const isAdmin = (req, res, next) => {
    var _a, _b, _c;
    if (((_c = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sessionClaims) === null || _b === void 0 ? void 0 : _b.metadata) === null || _c === void 0 ? void 0 : _c.role) !== "admin") {
        throw new forbidden_error_1.ForbiddenError("Forbidden");
    }
    next();
};
exports.default = isAdmin;
//# sourceMappingURL=authorization-middleware.js.map