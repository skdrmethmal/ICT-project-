import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const CheckoutForm = ({ bookingId }) => {
  const { getToken } = useAuth();
  const fetchClientSecret = useCallback(async () => {
    const token = await getToken();
    const response = await fetch(
      `${BACKEND_URL}/api/payment/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId }),
      }
    );
    const data = await response.json();
    return data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <>
      <EmbeddedCheckoutProvider options={options} stripe={stripePromise}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </>
  );
};
