import express from "express";
import {
  createReview,
  getReviewsForHotel,
  getReviewsForUser,
  deleteReview,
} from "../application/review";
import isAuthenticated from "../middlewares/authentication-middleware";

const reviewRouter = express.Router();

reviewRouter.post("/", isAuthenticated, createReview);
reviewRouter.get("/hotel/:hotelId", getReviewsForHotel);
reviewRouter.get("/user", getReviewsForUser);
reviewRouter.delete("/:id", isAuthenticated, deleteReview);

export default reviewRouter;
