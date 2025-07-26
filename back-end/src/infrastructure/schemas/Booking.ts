import { EmailAddress } from "@clerk/express";
import mongoose, { mongo } from "mongoose";

const bookingSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    required: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  nights: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
