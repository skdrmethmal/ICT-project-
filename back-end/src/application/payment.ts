import Hotel from "../infrastructure/schemas/Hotel";
import Booking from "../infrastructure/schemas/Booking";
import { Request, Response, NextFunction } from "express";
import stripe from "../infrastructure/stripe";
import util from "util";
import { sendEmail } from "../utills/mailer";
import { send } from "process";

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
    return;
  }

  if (booking.paymentStatus !== "PENDING") {
    throw new Error("Booking already paid");
    return;
  }

  if (checkoutSession.payment_status !== "unpaid") {
    await Booking.findByIdAndUpdate(booking._id, {
      paymentStatus: "PAID",
    });
  }

  const hotel = await Hotel.findById(booking.hotelId);
  const customerEmail = checkoutSession.customer_details?.email;
  const customerName = checkoutSession.customer_details?.name;

  await sendEmail({
    to: customerEmail as string,
    subject: `✅ Your Booking at ${hotel?.name} is Confirmed!`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 24px; color: #2d2d2d; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 24px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <h2 style="color: #1a202c;">Hi ${customerName},</h2>
        
        <p style="font-size: 16px;">Your booking has been successfully confirmed via <strong>HotelzaAI</strong>! We're excited to help you discover great stays like <strong>${hotel?.name}</strong> in ${hotel?.location}.</p>

        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0; background-color: #fefefe;">
          <img src="${hotel?.image}" alt="${hotel?.name} image" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 6px;" />
          
          <h3 style="margin-top: 16px; font-size: 20px;">${hotel?.name}</h3>
          <p style="margin: 6px 0;"><strong>📍 Location:</strong> ${hotel?.location}</p>
          <p style="margin: 6px 0;"><strong>💵 Price per night:</strong> $${hotel?.price}</p>
          <p style="margin-top: 10px; font-size: 15px; color: #4a5568;">${hotel?.description}</p>
        </div>

        <p style="font-size: 16px;">To view your full booking details, click the button below:</p>

        <a href="${FRONTEND_URL}/booking/complete?session_id=${checkoutSession.id}"
          style="display: inline-block; margin-top: 12px; padding: 12px 20px; background-color:rgb(0, 0, 0); color: white; text-decoration: none; border-radius: 6px; font-size: 16px;">
          View Booking Details
        </a>

        <p style="margin-top: 24px; font-size: 15px; color: #2d3748;">
          For any further inquiries, special requests, or updates to your booking, please contact the hotel directly at:
          <br />
          <strong><a href="mailto:${hotel?.hotelEmail}" style="color:rgb(0, 0, 0);">${hotel?.hotelEmail}</a></strong>
        </p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e2e8f0;" />

        <p style="font-size: 14px; color: #718096;">
          This email was sent to you by HotelzaAI – your trusted platform for discovering and booking amazing hotels. 
          We facilitate bookings between users and listed hotels. All post-booking matters are handled by the respective hotel.
        </p>

        <p style="font-size: 14px; color: #718096;">Thanks again for choosing HotelzaAI!</p>
      </div>
    </div>
  `,
  });

  await sendEmail({
    to: hotel?.hotelEmail as string,
    subject: `📩 A Guest Just Booked ${hotel?.name}!`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #ffffff; color: #1a1a1a;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 24px; border: 1px solid #e5e5e5; border-radius: 10px;">
        
        <h2 style="margin-bottom: 16px;">Hello ${hotel?.name},</h2>
        
        <p style="font-size: 16px;">A guest has just completed a booking at your hotel via <strong>HotelzaAI</strong>.</p>
        
        <div style="margin-top: 20px; padding: 16px; background-color: #f8f8f8; border-radius: 8px;">
          <p style="margin: 0;"><strong>📧 Guest Email:</strong> 
            <a href="mailto:${customerEmail}" style="color: #000; text-decoration: underline;">
              ${customerEmail}
            </a>
          </p>
          <p style="margin: 4px 0 0 0;"><strong>🧑 Guest Name:</strong> ${customerName}</p>
        </div>

        <p style="margin-top: 20px; font-size: 15px;">
          You can view full booking details using the button below:
        </p>

        <a href="${FRONTEND_URL}/booking/complete?session_id=${checkoutSession.id}"
          style="display: inline-block; margin-top: 12px; padding: 12px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px;">
          View Booking Details
        </a>

        <p style="margin-top: 30px; font-size: 15px; line-height: 1.6;">
          Please consider contacting the guest directly using the email provided above for any follow-up communication, special requests, or confirmations regarding their stay.
        </p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e0e0e0;" />

        <p style="font-size: 14px; color: #666;">
          This email was sent by HotelzaAI – the platform connecting travelers with hotel partners. While we facilitate the booking process, all post-booking communication and service coordination is between you and the guest.
        </p>

        <p style="font-size: 14px; color: #666;">Thank you for using HotelzaAI!</p>
      </div>
    </div>
  `,
  });

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
