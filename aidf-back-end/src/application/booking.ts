import { Request, Response, NextFunction } from "express";
import Booking from "../infrastructure/schemas/Booking";
import { createbookingDTO } from "../domain/dtos/booking";
import ValidationError from "../domain/errors/validation-error";
import { promise } from "zod";
import { clerkClient } from "@clerk/express";

interface AuthenticatedRequest extends Request {
  auth?: {
    userId?: string;
  };
}

export const createBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBooking = createbookingDTO.safeParse(req.body);

    if (!newBooking.success) {
      throw new ValidationError(newBooking.error.message);
    }
    // if (!newBooking.hotelId || !newBooking.checkIn || !newBooking.checkOut) {
    //   res.status(400).send("Please provide all the required fields");
    //   return;
    // }

    const user = req.auth;

    await Booking.create({
      hotelId: newBooking.data.hotelId,
      userId: user?.userId,
      checkIn: newBooking.data.checkIn,
      checkOut: newBooking.data.checkOut,
    });

    res.status(201).json({ newBooking, user: user?.userId });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  const bookings = await Booking.find();
  res.status(200).json(bookings);
};

export const getBookingById = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404).send("Booking not found");
    return;
  }
  res.status(200).json(booking);
};

export const getAllBookingsForHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.hotelId;
    if (!hotelId) {
      res.status(400).send("Please provide a hotel ID");
      return;
    }
    const bookingsForHotel = await Booking.find({ hotelId: hotelId });

    const bookingsForHotelWithUser = await Promise.all(
      bookingsForHotel.map(async (el) => {
        const user = await clerkClient.users.getUser(el.userId);
        return {
          _id: el._id,
          hotelId: el.hotelId,
          checkIn: el.checkIn,
          checkOut: el.checkOut,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        };
      })
    );

    if (!bookingsForHotel || bookingsForHotel.length === 0) {
      res.status(404).send("No bookings found for this hotel");
      return;
    }
    res.status(200).json(bookingsForHotelWithUser);
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookingsForUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send("Please provide a user ID");
    return;
  }
  const bookingsForUser = await Booking.find({ userId: userId });
  if (!bookingsForUser || bookingsForUser.length === 0) {
    res.status(404).send("No bookings found for this user");
    return;
  }
  res.status(200).json(bookingsForUser);
  return;
};

export const deleteBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  if (!bookingId) {
    res.status(400).send("Please provide a booking ID");
    return;
  }
  const deletedBooking = await Booking.findByIdAndDelete(bookingId);
  if (!deletedBooking) {
    res.status(404).send("Booking not found");
    return;
  }
  res.status(200).send("Booking deleted successfully");
  return;
};
