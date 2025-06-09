"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appstatistics_1 = require("../application/appstatistics");
const appStatisticsRouter = express_1.default.Router();
appStatisticsRouter.get("/", appstatistics_1.getAppStatistics);
appStatisticsRouter.post("/", appstatistics_1.updateAppStatistics);
appStatisticsRouter.get("/has-rated", appstatistics_1.hasUserRated);
appStatisticsRouter.get("/landing-reviews", appstatistics_1.getLandingReviews);
exports.default = appStatisticsRouter;
//# sourceMappingURL=appstatistics.js.map