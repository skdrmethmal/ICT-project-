import React from "react";
import { useDeleteUserReviewMutation } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmationModel } from "./ConfirmationModel";

export const ReviewCardForUser = ({ review }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteReview] = useDeleteUserReviewMutation();

  const handleConfirmationOpen = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  const handleDeleteReviewConfirm = async () => {
    try {
      await deleteReview(review._id).unwrap();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error.data.message);
      console.error("Error deleting review:", error);
    }
  };
  return (
    <div>
      <div className="bg-popover rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-medium text-popover-foreground">
          {review.hotel.name}
        </h3>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              className={
                index > review.rating - 1 ? "text-gray-300" : "text-yellow-400"
              }
              key={index}
            >
              ★
            </span>
          ))}
        </div>

        <p className="mt-4 text-popover-foreground">{review.review}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Posted on:{" "}
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="flex justify-end">
          <button
            className="mt-4 text-sm text-gray-500 hover:text-black cursor-pointer"
            onClick={handleConfirmationOpen}
          >
            Delete
          </button>
          <ConfirmationModel
            isOpen={isConfirmationOpen}
            onClose={handleConfirmationClose}
            onConfirm={handleDeleteReviewConfirm}
          />
        </div>
      </div>
    </div>
  );
};
