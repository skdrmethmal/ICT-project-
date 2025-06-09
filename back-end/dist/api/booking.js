"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = require("../application/booking");
const booking_2 = require("../application/booking");
const booking_3 = require("../application/booking");
const booking_4 = require("../application/booking");
const booking_5 = require("../application/booking");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication-middleware"));
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization-middleware"));
const bookingRouter = express_1.default.Router();
bookingRouter.post("/", booking_1.createBooking);
bookingRouter.get("/", booking_2.getAllBookings);
bookingRouter.get("/:id", authentication_middleware_1.default, booking_1.getBookingById);
bookingRouter.get("/hotel/:hotelId", authentication_middleware_1.default, authorization_middleware_1.default, booking_3.getAllBookingsForHotel);
bookingRouter.get("/user/:userId", booking_4.getAllBookingsForUser);
bookingRouter.delete("/:id", authentication_middleware_1.default, authorization_middleware_1.default, booking_5.deleteBooking);
exports.default = bookingRouter;
//# sourceMappingURL=booking.js.map