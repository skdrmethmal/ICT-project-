import Review from "../infrastructure/schemas/Reviews";
import { Request, Response, NextFunction } from "express";
import { createreviewDTO } from "../domain/dtos/review";
import ValidationError from "../domain/errors/validation-error";
import { promise } from "zod";
import { clerkClient } from "@clerk/express";
import Booking from "../infrastructure/schemas/Booking";
import Hotel from "../infrastructure/schemas/Hotel";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newReview = createreviewDTO.safeParse(req.body);

    if (!newReview.success) {
      throw new ValidationError(newReview.error.message);
    }

    const hotelId = newReview.data?.hotelId;
    const userId = req.auth?.userId;

    const hasBooking = await Booking.findOne({
      hotelId: hotelId,
      userId: userId,
    });

    if (!hasBooking) {
      res
        .status(403)
        .json({ message: "You must have a booking to leave a review" });
      return;
    }

    const hasReview = await Review.findOne({
      hotelId: hotelId,
      userId: userId,
    });

    if (hasReview) {
      res.status(400).json({ message: "You have already left a review" });
      return;
    }

    const clerkUser = await clerkClient.users.getUser(userId as string);
    if (!clerkUser) {
      throw new ValidationError("User not found");
      return;
    }

    const savedReview = await Review.create({
      userId: clerkUser.id,
      hotelId: newReview.data.hotelId,
      rating: newReview.data.rating,
      review: newReview.data.review,
    });

    await Hotel.findByIdAndUpdate(hotelId, {
      $inc: {
        reviews: 1,
        totalRating: newReview.data.rating,
      },
    });

    const updatedHotel = await Hotel.findById(hotelId);
    if (updatedHotel) {
      updatedHotel.rating = updatedHotel.totalRating / updatedHotel.reviews;
      await updatedHotel.save();
    }
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};

export const getReviewsForHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.hotelId;
    const reviews = await Review.find({
      hotelId: hotelId,
    });
    if (!reviews || reviews.length === 0) {
      res.json([]);
      return;
    }

    const reviewsWithUser = await Promise.all(
      reviews.map(async (review) => {
        const clerkUser = await clerkClient.users.getUser(review.userId);
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
      })
    );
    res.status(200).json(reviewsWithUser);

    return;
  } catch (error) {
    next(error);
  }
};

export const getReviewsForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.auth?.userId;
  try {
    const reviews = await Review.find({
      userId: userId,
    });
    if (!reviews || reviews.length === 0) {
      res.json([]);
      return;
    }

    const reviewsWithHotel = await Promise.all(
      reviews.map(async (review) => {
        const hotel = await Hotel.findById(review.hotelId);
        return {
          ...review.toObject(),
          hotel: {
            name: hotel?.name,
          },
        };
      })
    );
    res.status(200).json(reviewsWithHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    await Review.deleteOne({ _id: reviewId });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
