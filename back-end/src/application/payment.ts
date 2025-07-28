import Hotel from "../infrastructure/schemas/Hotel";
import Booking from "../infrastructure/schemas/Booking";
import { Request, Response, NextFunction } from "express";
import stripe from "../infrastructure/stripe";
import util from "util";

const FRONTEND_URL = process.env.FRONTEND_URL;
const endpointSecret = process.env.WEBHOOK_SECURITY_KEY as string;

// handler function to create a checkout session
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const bookingId = req.body.bookingId;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    const hotel = await Hotel.findById(booking.hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }

    const checkIn = booking.checkIn;
    const checkOut = booking.checkOut;
    const nights = booking.nights;

    if (!hotel.stripePriceId) {
      throw new Error("Stripe price ID not found for this hotel");
    }

    // create a checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: hotel.stripePriceId,
          quantity: nights,
        },
      ],
      mode: "payment",
      return_url: `${FRONTEND_URL}/booking/complete?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        bookingId: req.body.bookingId,
      },
    });
    res.send({ clientSecret: session.client_secret });
    return;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({
      message: "Failed to create checkout session",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const handleWebHook = async (req: Request, res: Response) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"] as string;
  console.log("payload is comming", payload);
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await fullFillCheckout(event.data.object.id);

      res.status(200).send();
      return;
    }
  } catch (error: Error | any) {
    console.error(`Webhook Error: ${error.message}`);
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }
};

export const fullFillCheckout = async (sessionId: string) => {
  // console.log("fullfilling checkout", sessionId);
  console.log("fullfilling checkout is happening also", sessionId);

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  // console.log(util.inspect(checkoutSession, false, null, true));

  const booking = await Booking.findById(checkoutSession.metadata?.bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.paymentStatus !== "PENDING") {
    throw new Error("Booking already paid");
  }

  if (checkoutSession.payment_status !== "unpaid") {
    await Booking.findByIdAndUpdate(booking._id, {
      paymentStatus: "PAID",
    });
  }
  return;
};

export const retrieveSessionStatus = async (req: Request, res: Response) => {
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    req.query.sessionId as string
  );

  const booking = await Booking.findById(checkoutSession.metadata?.bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }
  const hotel = await Hotel.findById(booking.hotelId);
  if (!hotel) {
    throw new Error("Hotel not found");
  }

  res.status(200).json({
    booking: booking,
    hotel: hotel,
    bookingId: booking._id,
    status: checkoutSession.status,
    customer_email: checkoutSession.customer_details?.email,
    payment_status: checkoutSession.payment_status,
  });
};
