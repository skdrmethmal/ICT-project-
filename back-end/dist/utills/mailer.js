"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
const sendEmail = ({ to, subject, html, }) => {
    return transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map