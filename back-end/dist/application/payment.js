"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveSessionStatus = exports.fullFillCheckout = exports.handleWebHook = exports.createCheckoutSession = void 0;
const Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
const Booking_1 = __importDefault(require("../infrastructure/schemas/Booking"));
const stripe_1 = __importDefault(require("../infrastructure/stripe"));
const FRONTEND_URL = process.env.FRONTEND_URL;
const endpointSecret = process.env.WEBHOOK_SECURITY_KEY;
// handler function to create a checkout session
const createCheckoutSession = async (req, res) => {
    try {
        const bookingId = req.body.bookingId;
        const booking = await Booking_1.default.findById(bookingId);
        if (!booking) {
            throw new Error("Booking not found");
        }
        const hotel = await Hotel_1.default.findById(booking.hotelId);
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
        const session = await stripe_1.default.checkout.sessions.create({
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
    }
    catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send({
            message: "Failed to create checkout session",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.createCheckoutSession = createCheckoutSession;
const handleWebHook = async (req, res) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    console.log("payload is comming", payload);
    let event;
    try {
        event = stripe_1.default.webhooks.constructEvent(payload, sig, endpointSecret);
        if (event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded") {
            await (0, exports.fullFillCheckout)(event.data.object.id);
            res.status(200).send();
            return;
        }
    }
    catch (error) {
        console.error(`Webhook Error: ${error.message}`);
        res.status(400).send(`Webhook Error: ${error.message}`);
        return;
    }
};
exports.handleWebHook = handleWebHook;
const fullFillCheckout = async (sessionId) => {
    var _a;
    // console.log("fullfilling checkout", sessionId);
    console.log("fullfilling checkout is happening also", sessionId);
    const checkoutSession = await stripe_1.default.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
    });
    // console.log(util.inspect(checkoutSession, false, null, true));
    const booking = await Booking_1.default.findById((_a = checkoutSession.metadata) === null || _a === void 0 ? void 0 : _a.bookingId);
    if (!booking) {
        throw new Error("Booking not found");
    }
    if (booking.paymentStatus !== "PENDING") {
        throw new Error("Booking already paid");
    }
    if (checkoutSession.payment_status !== "unpaid") {
        await Booking_1.default.findByIdAndUpdate(booking._id, {
            paymentStatus: "PAID",
        });
    }
    return;
};
exports.fullFillCheckout = fullFillCheckout;
const retrieveSessionStatus = async (req, res) => {
    var _a, _b;
    const checkoutSession = await stripe_1.default.checkout.sessions.retrieve(req.query.sessionId);
    const booking = await Booking_1.default.findById((_a = checkoutSession.metadata) === null || _a === void 0 ? void 0 : _a.bookingId);
    if (!booking) {
        throw new Error("Booking not found");
    }
    const hotel = await Hotel_1.default.findById(booking.hotelId);
    if (!hotel) {
        throw new Error("Hotel not found");
    }
    res.status(200).json({
        booking: booking,
        hotel: hotel,
        bookingId: booking._id,
        status: checkoutSession.status,
        customer_email: (_b = checkoutSession.customer_details) === null || _b === void 0 ? void 0 : _b.email,
        payment_status: checkoutSession.payment_status,
    });
};
exports.retrieveSessionStatus = retrieveSessionStatus;
//# sourceMappingURL=payment.js.map