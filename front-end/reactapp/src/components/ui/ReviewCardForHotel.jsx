import React from "react";

export const ReviewCardForHotel = ({ review }) => {
  return (
    <>
      <div className="">
        <div className="bg-popover  rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <img
              src={review.user.profileImageUrl}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            ></img>
            <h3 className="text-xl ml-2 font-medium text-popover-foreground">
              {review.user.firstName} {review.user.lastName}
            </h3>
          </div>
          <div className="flex items-center ml-4 mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={
                  index > review.rating - 1
                    ? "text-gray-300"
                    : "text-yellow-400"
                }
              >
                ★
              </span>
            ))}
          </div>

          <p className="mt-4 ml-4 text-popover-foreground">{review.review}</p>
          <p className="mt-2 ml-4 text-sm text-muted-foreground">
            Posted on:{" "}
            {new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </>
  );
};
