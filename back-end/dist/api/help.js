"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const help_1 = require("../application/help");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication-middleware"));
const helpRouter = express_1.default.Router();
helpRouter.post("/", authentication_middleware_1.default, help_1.createHelp);
helpRouter.get("/", help_1.getAllHelp);
helpRouter.post("/reply", authentication_middleware_1.default, help_1.replyToHelpRequest);
// helpRouter.delete("/:id", deleteHelp);
exports.default = helpRouter;
//# sourceMappingURL=help.js.map