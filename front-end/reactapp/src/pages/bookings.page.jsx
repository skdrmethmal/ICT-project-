import React from "react";
import { BookingCardForAdmin } from "@/components/ui/BookingCardForAdmin";
import { useGetAllBookingsQuery } from "@/lib/api";
export default function bookingsPage() {
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useGetAllBookingsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className=" w-[90vw] sm:w-[95vw] max-w-[1500px] mx-auto   my-5">
        <h1 className="text-[32px] font-bold mb-[8px] ">All Bookings</h1>
        <p className="text-gray-700 mb-5">
          Today we manage {bookings.length} bookings from our users.
        </p>
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 ">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCardForAdmin key={booking._id} booking={booking} />
            ))
          ) : (
            <div>No Bookings</div>
          )}
        </div>
      </div>
    </div>
  );
}
