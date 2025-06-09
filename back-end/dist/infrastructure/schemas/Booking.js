"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    hotelId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    hotelImage: {
        type: String,
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
    roomNumber: {
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
    //updates for the payment functionality
    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID"],
        default: "PENDING",
    },
    paymentMethod: {
        type: String,
        enum: ["CARD", "BAKN_TRANSFER"],
        default: "CARD",
    },
});
const Booking = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Booking;
//# sourceMappingURL=Booking.js.map