import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router";
import { useDeleteABookingMutation } from "@/lib/api";
import { toast } from "sonner";
import { ConfirmationModel } from "./ConfirmationModel";
import { useState } from "react";

export const BookingCard = ({ booking }) => {
  const [deleteBooking, { isLoading }] = useDeleteABookingMutation();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirmationOpen = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkIn = new Date(booking.checkIn);
  checkIn.setHours(0, 0, 0, 0);

  const diffInMs = checkIn - today;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const handleDeleteBookingConfirm = async () => {
    try {
      await deleteBooking({ id: booking._id }).unwrap();
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="bg-popover rounded-lg  hover:shadow-lg  transition-shadow">
      <Link to={`/hotel/${booking.hotelId}`}>
        {/* Left: Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl rounded-b-none block group relative">
          <img
            src={booking.hotelImage}
            alt={booking.hotelName}
            className="w-full h-full object-cover absolute transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex gap-2 items-center">
            <h2 className="px-3 py-1 bg-black text-white text-xs rounded-full ">
              {booking.paymentStatus}
            </h2>
            {
              <div className="">
                {diffInDays > 0 ? (
                  <div className="bg-white px-2 text-xs  py-1 text-black rounded-xl ">
                    IN {diffInDays} DAYS
                  </div>
                ) : diffInDays === 0 ? (
                  <div className="bg-green-300 px-2 text-xs  py-1 text-black rounded-xl ">
                    TODAY
                  </div>
                ) : (
                  <div className="bg-white px-2 text-xs  py-1 text-black rounded-xl ">
                    {-diffInDays} DAYS AGO
                  </div>
                )}
              </div>
            }
          </div>
        </div>
        <div className="p-4 ">
          <div className="">
            <h1 className="text-lg text-black font-semibold">
              {booking.hotelName}
            </h1>
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
      </Link>
      {/* Center: Hotel Info */}
      <div className="px-4 pb-4 flex justify-end">
        {booking.paymentStatus === "PENDING" ? (
          <div className="">
            <Button
              variant="outline"
              className="px-5 text-black text-xs mr-2 rounded-full"
              onClick={() => {
                handleConfirmationOpen();
              }}
            >
              Cancel Booking
            </Button>
            <ConfirmationModel
              isOpen={isConfirmationOpen}
              onClose={handleConfirmationClose}
              onConfirm={handleDeleteBookingConfirm}
            />
            <Button asChild className="px-5 rounded-full text-xs">
              <Link to={`/booking/payment?bookingId=${booking._id}`}>
                Pay Now
              </Link>
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
