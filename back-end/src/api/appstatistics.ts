import express from "express";
import {
  getAppStatistics,
  updateAppStatistics,
  hasUserRated,
  getLandingReviews,
} from "../application/appstatistics";

const appStatisticsRouter = express.Router();

appStatisticsRouter.get("/", getAppStatistics);
appStatisticsRouter.post("/", updateAppStatistics);
appStatisticsRouter.get("/has-rated", hasUserRated);
appStatisticsRouter.get("/landing-reviews", getLandingReviews);

export default appStatisticsRouter;
