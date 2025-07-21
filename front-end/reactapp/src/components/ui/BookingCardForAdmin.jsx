import React from "react";
import { Link } from "react-router";
import { CalendarDays } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const BookingCardForAdmin = ({ booking }) => {
  return (
    <div>
      <div className="bg-popover rounded-lg  hover:shadow-lg  transition-shadow">
        <Link to={`/hotel/${booking.hotelId}`}>
          {/* Left: Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl rounded-b-none block group relative">
            <LazyLoadImage
              src={booking.hotelImage ? booking.hotelImage : HeroImage}
              alt={booking.hotelName}
              className="w-full h-full object-cover absolute transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex gap-2 items-center">
              <h2 className="px-3 py-1 bg-black text-white text-xs rounded-full ">
                {booking.paymentStatus}
              </h2>
            </div>
          </div>
          <div className="p-4 ">
            <div className="">
              <h1 className="text-lg text-black font-semibold">
                {booking.hotelName}
              </h1>
              <p className="text-xs text-gray-500">
                Hotel Id:{booking.hotelId}
              </p>
            </div>

            {/* Dates */}
            <div className="my-4">
              <div className="text-sm text-gray-500 flex items-center gap-2  my-2">
                <CalendarDays className="w-4 h-4" />
                Check In : {new Date(booking.checkIn).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2  my-2">
                <CalendarDays className="w-4 h-4" />
                Check Out :{new Date(booking.checkOut).toLocaleDateString()}
              </div>
            </div>
            <p className=" text-black font-semibold mt-2 text-xl">
              ${booking.totalPrice.toFixed(2)}
            </p>

            <p className="text-xs mt-2  text-gray-500">Booked by</p>
            <h1 className="text-lg text-black font-semibold mt-2">
              {booking.userFullName}
            </h1>
            <p className="text-xs text-gray-500">{booking.email}</p>
            <p className="text-xs text-gray-500">User Id:{booking.userId}</p>
            <p className="text-xs mt-4 text-gray-500">
              Booking ID: {booking._id}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
