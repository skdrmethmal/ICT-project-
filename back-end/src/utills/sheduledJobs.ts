import Booking from "../infrastructure/schemas/Booking";
import { sendEmail } from "./mailer";

export const deleteExpiredBookings = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  const result = await Booking.deleteMany({
    checkIn: { $lt: twoDaysAgo },
  });

  console.log(`Deleted ${result.deletedCount} expired bookings`);
};

export const sendCheckInReminders = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const bookings = await Booking.find({
    checkIn: new Date(tomorrow),
    paymentStatus: "PAID",
  });

  for (const booking of bookings) {
    await sendEmail({
      to: booking.email as string,
      subject: `Reminder: Your hotel check-in is tomorrow`,
      html: `
  <div style="font-family: Arial, sans-serif; color: #000; background-color: #fff; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 12px;">🛎️ Check-In Reminder</h2>
    
    <p>Hi <strong>${booking.userFullName}</strong>,</p>

    <p>This is a friendly reminder that your stay at <strong>${
      booking.hotelName
    }</strong> is scheduled to begin <strong>tomorrow</strong>.</p>

    <div style="margin: 24px 0;">
      <img src="${
        booking.hotelImage
      }" alt="Hotel Image" style="width: 100%; height: auto; border-radius: 6px; border: 1px solid #000;" />
    </div>

    <div style="background-color: #f8f8f8; padding: 16px; border-radius: 6px; border: 1px solid #000;">
      <h3 style="margin-top: 0; border-bottom: 1px solid #000; padding-bottom: 8px;">🛏️ Booking Details</h3>
      <p><strong>Guest:</strong> ${booking.userFullName}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Hotel:</strong> ${booking.hotelName}</p>
      <p><strong>Room Number:</strong> ${booking.roomNumber}</p>
      <p><strong>Stay Duration:</strong> ${booking.nights} night(s)</p>
      <p><strong>Total Price:</strong> $${booking.totalPrice.toFixed(2)}</p>
    </div>

    <p style="margin-top: 32px;">We’re excited to welcome you! If you have any questions or need help, feel free to contact us.</p>

    <p style="margin-top: 24px;">See you soon,<br><strong>HotelzaAI Team</strong></p>
  </div>
`,
    });
  }

  console.log(`Sent ${bookings.length} check-in reminders`);
};
