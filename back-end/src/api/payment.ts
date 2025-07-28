import { createCheckoutSession } from "../application/payment";
import express from "express";
import isAuthenticated from "../middlewares/authentication-middleware";
import { retrieveSessionStatus } from "../application/payment";
const paymentRouter = express.Router();

paymentRouter.post(
  "/create-checkout-session",
  isAuthenticated,
  createCheckoutSession
);

paymentRouter.get("/session-status", retrieveSessionStatus);

export default paymentRouter;
