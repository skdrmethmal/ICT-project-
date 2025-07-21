import express from "express";
import { createBooking, getBookingById } from "../application/booking";
import { getAllBookings } from "../application/booking";
import { getAllBookingsForHotel } from "../application/booking";
import { getAllBookingsForUser } from "../application/booking";
import { deleteBooking } from "../application/booking";
import isAuthenticated from "../middlewares/authentication-middleware";
import isAdmin from "../middlewares/authorization-middleware";
const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", isAuthenticated, isAdmin, getAllBookings);
bookingRouter.get("/:id", isAuthenticated, getBookingById);
bookingRouter.get(
  "/hotel/:hotelId",
  isAuthenticated,
  isAdmin,
  getAllBookingsForHotel
);
bookingRouter.get("/user/:userId", getAllBookingsForUser);
bookingRouter.delete("/:id", isAuthenticated, deleteBooking);
export default bookingRouter;
