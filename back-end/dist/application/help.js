"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyToHelpRequest = exports.getAllHelp = exports.createHelp = void 0;
const Help_1 = __importDefault(require("../infrastructure/schemas/Help"));
const help_1 = require("../domain/dtos/help");
const express_1 = require("@clerk/express");
const mailer_1 = require("../utills/mailer");
const createHelp = async (req, res, next) => {
    var _a;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        res.status(400).json({ message: "Please provide a user ID" });
        return;
    }
    const clerkUser = await express_1.clerkClient.users.getUser(userId);
    if (!clerkUser) {
        res.status(400).json({ message: "Please provide a valid user ID" });
        return;
    }
    const newHelp = help_1.createHelpDTO.safeParse(req.body);
    if (!newHelp.success) {
        res.status(400).json({ message: newHelp.error });
        return;
    }
    const hasHelp = await Help_1.default.findOne({
        userId: clerkUser.id,
    });
    if (hasHelp) {
        res.status(400).json({
            message: "You already have a help request wait until it is resolved",
        });
        return;
    }
    const savedHelp = await Help_1.default.create({
        userId: clerkUser.id,
        name: newHelp.data.name,
        email: newHelp.data.email,
        subject: newHelp.data.subject,
        message: newHelp.data.message,
    });
    res.status(201).json(savedHelp);
};
exports.createHelp = createHelp;
const getAllHelp = async (req, res) => {
    const help = await Help_1.default.find({});
    if (!help || help.length === 0) {
        res.json([]);
        return;
    }
    res.status(200).json(help);
    return;
};
exports.getAllHelp = getAllHelp;
// export const deleteHelp = async (req: Request, res: Response) => {
//   const helpId = req.params.id;
//   if (!helpId) {
//     res.status(400).send("Please provide a help ID");
//     return;
//   }
//   const deletedHelp = await Help.findByIdAndDelete(helpId);
//   if (!deletedHelp) {
//     res.status(404).send("Help not found");
//     return;
//   }
//   res.status(200).send("Help deleted successfully");
//   return;
// };
const replyToHelpRequest = async (req, res, next) => {
    try {
        const { to, name, subject, message, reply, helpId } = req.body;
        if (!to || !reply || !helpId) {
            res
                .status(400)
                .json({ message: "Please provide all the required fields" });
            return;
        }
        await (0, mailer_1.sendEmail)({
            to,
            subject: `Reply: ${subject}`,
            html: `
        <p>Hi ${name},</p>
        <p><strong>Your original request:</strong></p>
        <blockquote>${message}</blockquote>
        <p><strong>Our response:</strong></p>
        <p>${reply}</p>
        <br/>
        <p>— HotelzaAI Support Team</p>
      `,
        });
        await Help_1.default.findByIdAndDelete(helpId);
        res.status(200).json({ message: "Help request replied successfully" });
        return;
    }
    catch (error) {
        console.log("Error replying to help request", error);
        res.status(400).json({ message: "Has errors with sending email" });
        return;
    }
};
exports.replyToHelpRequest = replyToHelpRequest;
//# sourceMappingURL=help.js.map