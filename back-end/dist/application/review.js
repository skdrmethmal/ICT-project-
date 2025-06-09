"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsForUser = exports.getReviewsForHotel = exports.createReview = void 0;
const Reviews_1 = __importDefault(require("../infrastructure/schemas/Reviews"));
const review_1 = require("../domain/dtos/review");
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const express_1 = require("@clerk/express");
const Booking_1 = __importDefault(require("../infrastructure/schemas/Booking"));
const Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createReview = async (req, res, next) => {
    var _a, _b;
    try {
        const newReview = review_1.createreviewDTO.safeParse(req.body);
        if (!newReview.success) {
            throw new validation_error_1.default(newReview.error.message);
        }
        const hotelId = (_a = newReview.data) === null || _a === void 0 ? void 0 : _a.hotelId;
        const userId = (_b = req.auth) === null || _b === void 0 ? void 0 : _b.userId;
        const hasBooking = await Booking_1.default.findOne({
            hotelId: hotelId,
            userId: userId,
        });
        if (!hasBooking) {
            res
                .status(403)
                .json({ message: "You must have a booking to leave a review" });
            return;
        }
        const hasReview = await Reviews_1.default.findOne({
            hotelId: hotelId,
            userId: userId,
        });
        if (hasReview) {
            res.status(400).json({ message: "You have already left a review" });
            return;
        }
        const clerkUser = await express_1.clerkClient.users.getUser(userId);
        if (!clerkUser) {
            throw new validation_error_1.default("User not found");
            return;
        }
        const savedReview = await Reviews_1.default.create({
            userId: clerkUser.id,
            hotelId: newReview.data.hotelId,
            rating: newReview.data.rating,
            review: newReview.data.review,
        });
        res.status(201).json(savedReview);
    }
    catch (error) {
        next(error);
    }
};
exports.createReview = createReview;
const getReviewsForHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        const reviews = await Reviews_1.default.find({
            hotelId: hotelId,
        });
        if (!reviews || reviews.length === 0) {
            res.json([]);
            return;
        }
        const reviewsWithUser = await Promise.all(reviews.map(async (review) => {
            const clerkUser = await express_1.clerkClient.users.getUser(review.userId);
            // const hotel = await Hotel.findById(review.hotelId);
            return {
                ...review.toObject(),
                user: {
                    id: clerkUser.id,
                    firstName: clerkUser.firstName,
                    lastName: clerkUser.lastName,
                    profileImageUrl: clerkUser.imageUrl,
                },
                // hotel: {
                //   id: hotel?._id,
                //   name: hotel?.name,
                // },
            };
        }));
        res.status(200).json(reviewsWithUser);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getReviewsForHotel = getReviewsForHotel;
const getReviewsForUser = async (req, res, next) => {
    var _a;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const reviews = await Reviews_1.default.find({
            userId: userId,
        });
        if (!reviews || reviews.length === 0) {
            res.json([]);
            return;
        }
        const reviewsWithHotel = await Promise.all(reviews.map(async (review) => {
            const hotel = await Hotel_1.default.findById(review.hotelId);
            return {
                ...review.toObject(),
                hotel: {
                    name: hotel === null || hotel === void 0 ? void 0 : hotel.name,
                },
            };
        }));
        res.status(200).json(reviewsWithHotel);
    }
    catch (error) {
        next(error);
    }
};
exports.getReviewsForUser = getReviewsForUser;
//# sourceMappingURL=review.js.map