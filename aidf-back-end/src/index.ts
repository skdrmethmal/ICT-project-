import "dotenv/config";
import express from "express";
import hotelsRouter from "./api/hotel";
import connectDB from "./infrastructure/db";
// import userRouter from "./api/user";
import bookingRouter from "./api/booking";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import globalErrorHandlingMiddleware from "./middlewares/global-error-handling-middleware";
const app = express();

app.use(clerkMiddleware());

//Middleware to parse JSON - set json to the req.body property
app.use(express.json());

//To allow cross-origin requests
app.use(cors());

//Connect to the database
connectDB();

app.use("/api/hotel", hotelsRouter);
// app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);

app.use(globalErrorHandlingMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//
