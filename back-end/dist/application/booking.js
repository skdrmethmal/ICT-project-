"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.getAllBookingsForUser = exports.getAllBookingsForHotel = exports.getBookingById = exports.getAllBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../infrastructure/schemas/Booking"));
const booking_1 = require("../domain/dtos/booking");
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const express_1 = require("@clerk/express");
// interface AuthenticatedRequest extends Request {
//   auth?: {
//     userId?: string;
//     userFullName?: string;
//     emailAddresses?: Array<{ emailAddress: string }>;
//   };
// }
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createBooking = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const newBooking = booking_1.createbookingDTO.safeParse(req.body);
        if (!newBooking.success) {
            throw new validation_error_1.default(newBooking.error.message);
        }
        // if (!newBooking.hotelId || !newBooking.checkIn || !newBooking.checkOut) {
        //   res.status(400).send("Please provide all the required fields");
        //   return;
        // }
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(400).send("Please provide a user ID");
            return;
        }
        const clerkUser = await express_1.clerkClient.users.getUser(userId);
        const userFullName = clerkUser.fullName;
        const email = (_c = (_b = clerkUser === null || clerkUser === void 0 ? void 0 : clerkUser.emailAddresses) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.emailAddress;
        const savedBooking = await Booking_1.default.create({
            hotelId: newBooking.data.hotelId,
            hotelName: newBooking.data.hotelName,
            hotelImage: newBooking.data.hotelImage,
            userId: userId,
            userFullName: userFullName,
            email: email,
            totalPrice: newBooking.data.totalPrice,
            roomNumber: await (async () => {
                let roomNumber;
                let isRoomAvailable = false;
                while (!isRoomAvailable) {
                    roomNumber = Math.floor(Math.random() * 1000) + 1;
                    const existingBooking = await Booking_1.default.findOne({
                        hotelId: newBooking.data.hotelId,
                        roomNumber: roomNumber,
                        $or: [
                            {
                                checkIn: { $lte: newBooking.data.checkOut },
                                checkOut: { $gte: newBooking.data.checkIn },
                            },
                        ],
                    });
                    isRoomAvailable = !existingBooking;
                }
                return roomNumber;
            })(),
            nights: newBooking.data.nights,
            checkIn: newBooking.data.checkIn,
            checkOut: newBooking.data.checkOut,
        });
        // res.status(201).json({ newBooking, user: userId });
        console.log(savedBooking._id);
        res.status(201).json(savedBooking);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.createBooking = createBooking;
const getAllBookings = async (req, res) => {
    const bookings = await Booking_1.default.find();
    res.status(200).json(bookings);
};
exports.getAllBookings = getAllBookings;
const getBookingById = async (req, res) => {
    const booking = await Booking_1.default.findById(req.params.id);
    if (!booking) {
        res.status(404).send("Booking not found");
        return;
    }
    res.status(200).json(booking);
};
exports.getBookingById = getBookingById;
const getAllBookingsForHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        if (!hotelId) {
            res.status(400).send("Please provide a hotel ID");
            return;
        }
        const bookingsForHotel = await Booking_1.default.find({ hotelId: hotelId });
        const bookingsForHotelWithUser = await Promise.all(bookingsForHotel.map(async (el) => {
            const user = await express_1.clerkClient.users.getUser(el.userId);
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
        }));
        if (!bookingsForHotel || bookingsForHotel.length === 0) {
            res.status(404).send("No bookings found for this hotel");
            return;
        }
        res.status(200).json(bookingsForHotelWithUser);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBookingsForHotel = getAllBookingsForHotel;
const getAllBookingsForUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).send("Please provide a user ID");
        return;
    }
    const bookingsForUser = await Booking_1.default.find({ userId: userId });
    if (!bookingsForUser || bookingsForUser.length === 0) {
        res.json([]);
        return;
    }
    res.status(200).json(bookingsForUser);
    return;
};
exports.getAllBookingsForUser = getAllBookingsForUser;
const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    if (!bookingId) {
        res.status(400).send("Please provide a booking ID");
        return;
    }
    const deletedBooking = await Booking_1.default.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
        res.status(404).send("Booking not found");
        return;
    }
    res.status(200).send("Booking deleted successfully");
    return;
};
exports.deleteBooking = deleteBooking;
//# sourceMappingURL=booking.js.map