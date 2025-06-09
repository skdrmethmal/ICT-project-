"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hotelSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        max: 5.0,
        min: 1.0,
    },
    reviews: {
        type: Number,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stripePriceId: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
    },
});
const Hotel = mongoose_1.default.model("Hotel", hotelSchema);
exports.default = Hotel;
//# sourceMappingURL=Hotel.js.map