import { Request, Response, NextFunction } from "express";
import AppRating from "../infrastructure/schemas/AppRating";
import Hotel from "../infrastructure/schemas/Hotel";
import Clerk from "@clerk/clerk-sdk-node";
import { clerkClient } from "@clerk/express";
import { cache } from "../utills/Cache";

export const getAppStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Check cache first
    const cachedStats = cache.get("appStats");
    if (cachedStats) {
      console.log("App statistics fetching from the cache");
      res.json(cachedStats);
      return;
    }
    console.log("App statistics not found in the cache");

    // 2. Fetch number of users (optional: replace with stored value for better perf)
    const userCount = (await clerkClient.users.getUserList()).totalCount;

    // 3. Fetch number of hotels
    const hotelCount = await Hotel.countDocuments();

    // 4. Calculate average rating from ratings collection
    const ratingData = await AppRating.aggregate([
      {
        $group: {
          _id: null,
          totalRating: { $sum: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    const averageRating =
      ratingData.length > 0
        ? parseFloat(
            (ratingData[0].totalRating / ratingData[0].count).toFixed(1)
          )
        : 0;

    const statistics = {
      usersCount: userCount,
      hotelsCount: hotelCount,
      appRating: averageRating,
    };

    // 5. Cache the result for 10 hours
    cache.set("appStats", statistics);

    res.json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAppStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rating, userId, review } = req.body;

  if (!userId || !rating || !review) {
    res.status(400).json({ message: "Missing Data" });
    return;
  }
  try {
    const user = await Clerk.users.getUser(userId);
    if (!user) {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.imageUrl,
    };
    const RatingCount = await AppRating.countDocuments({});
    console.log(RatingCount);

    if (RatingCount === 0) {
      const newRating = AppRating.create({
        userId,
        rating,
        review,
        user: userData,
      });
      res.status(200).json(newRating);
      return;
    }

    const updatedRating = await AppRating.findOneAndUpdate(
      { userId },
      { rating, review, user: userData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedRating);
    return;
  } catch (error) {
    console.error("Error updating app rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const hasUserRated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.query.userId as string;
  if (!userId || userId === "undefined") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const hasRated = await AppRating.findOne({ userId });

    res.status(200).json({ hasRated: !!hasRated });
  } catch (error) {
    console.error("Error fetching has rated:", error);
    next(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLandingReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cachedReviews = cache.get("landingReviews");
    if (cachedReviews) {
      console.log("Landing reviews fetching from the cache");
      res.json(cachedReviews);
      return;
    }
    console.log("Landing reviews not found in the cache");
    const landingReviews = await AppRating.find({ rating: { $gte: 3 } })
      .sort({ createdAt: -1 })
      .limit(3);

    cache.set("landingReviews", landingReviews);
    res.status(200).json(landingReviews);
    return;
  } catch (error) {
    next(error);
  }
};
