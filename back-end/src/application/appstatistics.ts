import { Request, Response, NextFunction } from "express";
import AppRating from "../infrastructure/schemas/AppRating";
import Hotel from "../infrastructure/schemas/Hotel";
import NodeCache from "node-cache";
import Clerk from "@clerk/clerk-sdk-node";
import { clerkClient } from "@clerk/express";

const cache = new NodeCache({ stdTTL: 900 });

export const getAppStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Check cache first
    const cachedStats = cache.get("appStats");
    if (cachedStats) {
      res.json(cachedStats);
      return;
    }

    // 2. Fetch number of users (optional: replace with stored value for better perf)
    const userList = await Clerk.users.getUserList({ limit: 10 });
    const userCount = userList.length; // Clerk provides total count

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

    // 5. Cache the result for 15 minutes
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
    const RatingCount = await AppRating.countDocuments({});
    console.log(RatingCount);
    if (RatingCount === 0) {
      const newRating = AppRating.create({ userId, rating, review });
      res.status(200).json(newRating);
      return;
    }

    const updatedRating = await AppRating.findOneAndUpdate(
      { userId },
      { rating, review },
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
    await Clerk.users.getUser(userId);

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
    const landingReview = await AppRating.find({ rating: { $gte: 3 } })
      .sort({ createdAt: -1 })
      .limit(3);
    const landingReviewsWithUser = await Promise.all(
      landingReview.map(async (elreview) => {
        const clerkUser = await clerkClient.users.getUser(elreview.userId);
        return {
          ...elreview.toObject(),
          user: {
            id: clerkUser.id,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            profileImageUrl: clerkUser.imageUrl,
          },
        };
      })
    );
    res.status(200).json(landingReviewsWithUser);
    return;
  } catch (error) {
    next(error);
  }
};
