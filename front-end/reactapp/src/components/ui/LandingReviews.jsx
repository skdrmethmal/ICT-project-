import React from "react";
import { ReviewCardForHotel } from "./ReviewCardForHotel";
import { useGetLandingReviewsQuery } from "@/lib/api";
import { motion } from "framer-motion";

export const LandingReviews = () => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGetLandingReviewsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="  bg-card rounded-full p-10 mt-10 mb-24 mx-auto max-w-7xl border border-border/40"
      > */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-full bg-white/10 backdrop-blur-2xl border border-zinc-100/20 shadow-[inset_0_1px_6px_rgba(255,255,255,0.1)] p-10 mt-10 mb-24 mx-auto max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews?.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ReviewCardForHotel review={review} />
              </motion.div>
            ))
          ) : (
            <div className="text-muted-foreground col-span-full text-center">
              No reviews yet
            </div>
          )}
        </div>

        <motion.p
          className="text-base mt-10 text-center text-muted-foreground italic"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Reviews from real guests who enjoyed their stay
        </motion.p>

        <motion.p
          className="text-3xl mt-4 text-center font-bold"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="text-2xl font-bold">Hotelza</span>
          <span className="text-blue-700 animate-pulse ">AI</span>
        </motion.p>
      </motion.div>
    </>
  );
};
