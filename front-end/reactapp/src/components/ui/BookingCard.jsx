import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import HeroImage from "@/assets/hero_1.jpg";
import { Link } from "react-router";

export const BookingCard = ({ booking }) => {
  return (
    <Link to={`/hotel/${booking.hotelId}`}>
      <div className="bg-popover rounded-lg  hover:shadow-lg transition-shadow">
        {/* Left: Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl rounded-b-none block group relative">
          <img
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
          </div>
          <div className="mt-2 flex items-center text-muted-foreground">
            <p className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {booking.location || "Unknown Location"}
            </p>
          </div>
          {/* Dates */}
          <div className="">
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
          <p className="text-xs text-gray-500">Booking ID: {booking._id}</p>
        </div>
        {/* Center: Hotel Info */}
        <div className="px-4 pb-4 flex justify-end">
          <Button
            variant="outline"
            className="px-5 text-black"
            onClick={() => console.log("Cancel booking logic here")}
          >
            Cancel Booking
          </Button>
        </div>
      </div>
    </Link>
  );
};
