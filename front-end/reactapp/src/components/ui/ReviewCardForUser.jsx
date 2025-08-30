import React from "react";

export const ReviewCardForUser = ({ review }) => {
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
      </div>
    </div>
  );
};
