import React from "react";
import { useSearchParams } from "react-router";
import { useGetBookingByIdQuery } from "@/lib/api";
import { CheckoutForm } from "@/components/ui/CheckoutForm";

export default function PaymentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { data: booking, isLoading } = useGetBookingByIdQuery(bookingId);

  if (isLoading || !booking) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-4xl font-bold text-center">Review Your Booking</h2>
        <div className="mt-8">
          <CheckoutForm bookingId={booking._id} />
        </div>
      </main>
    </div>
  );
}
