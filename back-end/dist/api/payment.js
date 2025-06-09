"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("../application/payment");
const express_1 = __importDefault(require("express"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication-middleware"));
const payment_2 = require("../application/payment");
const paymentRouter = express_1.default.Router();
paymentRouter.post("/create-checkout-session", authentication_middleware_1.default, payment_1.createCheckoutSession);
paymentRouter.get("/session-status", payment_2.retrieveSessionStatus);
exports.default = paymentRouter;
//# sourceMappingURL=payment.js.map