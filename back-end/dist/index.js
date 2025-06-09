"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const hotel_1 = __importDefault(require("./api/hotel"));
const db_1 = __importDefault(require("./infrastructure/db"));
// import userRouter from "./api/user";
const booking_1 = __importDefault(require("./api/booking"));
const payment_1 = __importDefault(require("./api/payment"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const global_error_handling_middleware_1 = __importDefault(require("./middlewares/global-error-handling-middleware"));
const payment_2 = require("./application/payment");
const body_parser_1 = __importDefault(require("body-parser"));
const review_1 = __importDefault(require("./api/review"));
const help_1 = __importDefault(require("./api/help"));
const appstatistics_1 = __importDefault(require("./api/appstatistics"));
const FRONTEND_URL = process.env.FRONTEND_URL;
const app = (0, express_1.default)();
app.use((0, express_2.clerkMiddleware)());
//To allow cross-origin requests
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.post("/api/stripe/webhook", body_parser_1.default.raw({ type: "application/json" }), payment_2.handleWebHook);
//Middleware to parse JSON - set json to the req.body property
app.use(express_1.default.json());
//Connect to the database
(0, db_1.default)();
app.use("/api/hotel", hotel_1.default);
// app.use("/api/user", userRouter);
app.use("/api/booking", booking_1.default);
app.use("/api/payment", payment_1.default);
app.use("/api/review", review_1.default);
app.use("/api/help", help_1.default);
app.use("/api/appstatistics", appstatistics_1.default);
app.use(global_error_handling_middleware_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}`);
});
//
//# sourceMappingURL=index.js.map