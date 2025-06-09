"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = require("../application/review");
const reviewRouter = express_1.default.Router();
reviewRouter.post("/", review_1.createReview);
reviewRouter.get("/hotel/:hotelId", review_1.getReviewsForHotel);
reviewRouter.get("/user", review_1.getReviewsForUser);
exports.default = reviewRouter;
//# sourceMappingURL=review.js.map