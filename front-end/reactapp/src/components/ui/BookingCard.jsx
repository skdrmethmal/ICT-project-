import React from "react";
import { Button } from "@/components/ui/button";

export const BookingCard = (props) => {
  return (
    <div>
      <div className="bg-popover rounded-lg p-6 hover:shadow-lg transition-shadow ">
        <h3 className="text-xl font-medium text-popover-foreground">
          {props.booking.hotelName}
        </h3>
        <div className="space-y-2 mt-4 text-muted-foreground">
          <p className="flex justify-between">
            <span>Check-in:</span>
            <span>{new Date(props.booking.checkIn).toLocaleDateString()}</span>
          </p>
          <p className="flex justify-between">
            <span>Check-out:</span>
            <span>{new Date(props.booking.checkOut).toLocaleDateString()}</span>
          </p>
          <p className="flex justify-between">
            <span>Nights:</span>
            <span>{props.booking.nights}</span>
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Confirmed
            </span>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
