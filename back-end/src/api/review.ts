import express from "express";
import {
  createReview,
  getReviewsForHotel,
  getReviewsForUser,
} from "../application/review";
const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/hotel/:hotelId", getReviewsForHotel);
reviewRouter.get("/user", getReviewsForUser);

export default reviewRouter;
