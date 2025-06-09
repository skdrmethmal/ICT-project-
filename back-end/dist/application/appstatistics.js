"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLandingReviews = exports.hasUserRated = exports.updateAppStatistics = exports.getAppStatistics = void 0;
const AppRating_1 = __importDefault(require("../infrastructure/schemas/AppRating"));
const Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
const node_cache_1 = __importDefault(require("node-cache"));
const clerk_sdk_node_1 = __importDefault(require("@clerk/clerk-sdk-node"));
const express_1 = require("@clerk/express");
const cache = new node_cache_1.default({ stdTTL: 900 });
const getAppStatistics = async (req, res, next) => {
    try {
        // 1. Check cache first
        const cachedStats = cache.get("appStats");
        if (cachedStats) {
            res.json(cachedStats);
            return;
        }
        // 2. Fetch number of users (optional: replace with stored value for better perf)
        const userList = await clerk_sdk_node_1.default.users.getUserList({ limit: 10 });
        const userCount = userList.length; // Clerk provides total count
        // 3. Fetch number of hotels
        const hotelCount = await Hotel_1.default.countDocuments();
        // 4. Calculate average rating from ratings collection
        const ratingData = await AppRating_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalRating: { $sum: "$rating" },
                    count: { $sum: 1 },
                },
            },
        ]);
        const averageRating = ratingData.length > 0
            ? parseFloat((ratingData[0].totalRating / ratingData[0].count).toFixed(1))
            : 0;
        const statistics = {
            usersCount: userCount,
            hotelsCount: hotelCount,
            appRating: averageRating,
        };
        // 5. Cache the result for 15 minutes
        cache.set("appStats", statistics);
        res.json(statistics);
    }
    catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAppStatistics = getAppStatistics;
const updateAppStatistics = async (req, res, next) => {
    const { rating, userId, review } = req.body;
    if (!userId || !rating || !review) {
        res.status(400).json({ message: "Missing Data" });
        return;
    }
    try {
        const user = await clerk_sdk_node_1.default.users.getUser(userId);
        if (!user) {
            res.status(400).json({ message: "Invalid userId" });
            return;
        }
        const RatingCount = await AppRating_1.default.countDocuments({});
        console.log(RatingCount);
        if (RatingCount === 0) {
            const newRating = AppRating_1.default.create({ userId, rating, review });
            res.status(200).json(newRating);
            return;
        }
        const updatedRating = await AppRating_1.default.findOneAndUpdate({ userId }, { rating, review }, { upsert: true, new: true, setDefaultsOnInsert: true });
        res.status(200).json(updatedRating);
        return;
    }
    catch (error) {
        console.error("Error updating app rating:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateAppStatistics = updateAppStatistics;
const hasUserRated = async (req, res, next) => {
    const userId = req.query.userId;
    if (!userId || userId === "undefined") {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        await clerk_sdk_node_1.default.users.getUser(userId);
        const hasRated = await AppRating_1.default.findOne({ userId });
        res.status(200).json({ hasRated: !!hasRated });
    }
    catch (error) {
        console.error("Error fetching has rated:", error);
        next(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.hasUserRated = hasUserRated;
const getLandingReviews = async (req, res, next) => {
    try {
        const landingReview = await AppRating_1.default.find({ rating: { $gte: 3 } })
            .sort({ createdAt: -1 })
            .limit(3);
        const landingReviewsWithUser = await Promise.all(landingReview.map(async (elreview) => {
            const clerkUser = await express_1.clerkClient.users.getUser(elreview.userId);
            return {
                ...elreview.toObject(),
                user: {
                    id: clerkUser.id,
                    firstName: clerkUser.firstName,
                    lastName: clerkUser.lastName,
                    profileImageUrl: clerkUser.imageUrl,
                },
            };
        }));
        res.status(200).json(landingReviewsWithUser);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getLandingReviews = getLandingReviews;
//# sourceMappingURL=appstatistics.js.map