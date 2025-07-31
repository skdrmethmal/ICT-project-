import "dotenv/config";
import express from "express";
import hotelsRouter from "./api/hotel";
import connectDB from "./infrastructure/db";
// import userRouter from "./api/user";
import bookingRouter from "./api/booking";
import paymentRouter from "./api/payment";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import globalErrorHandlingMiddleware from "./middlewares/global-error-handling-middleware";
import { handleWebHook } from "./application/payment";
import bodyParser from "body-parser";
import reviewRouter from "./api/review";

const FRONTEND_URL = process.env.FRONTEND_URL;
const app = express();

app.use(clerkMiddleware());

//To allow cross-origin requests
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.post(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebHook
);

//Middleware to parse JSON - set json to the req.body property
app.use(express.json());

//Connect to the database
connectDB();

app.use("/api/hotel", hotelsRouter);
// app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
});

//
