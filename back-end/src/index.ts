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
import helpRouter from "./api/help";
import appStatisticsRouter from "./api/appstatistics";
import cron from "node-cron";
import { deleteExpiredBookings } from "./utills/sheduledJobs";
import { sendCheckInReminders } from "./utills/sheduledJobs";

const FRONTEND_URL = process.env.FRONTEND_URL;
const app = express();

app.all("/health", (req, res) => {
  console.log(`🔍 UptimeRobot test: ${req.method}`);
  res.status(200).json({ method: req.method, ok: true });
});

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
connectDB().then(() => {
  cron.schedule("30 2 * * *", async () => {
    console.log("Running daily booking cleanup...");
    await deleteExpiredBookings();

    console.log("Running check-in reminders...");
    await sendCheckInReminders();
  });
});

app.use("/api/hotel", hotelsRouter);
// app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);
app.use("/api/help", helpRouter);
app.use("/api/appstatistics", appStatisticsRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
});

//
