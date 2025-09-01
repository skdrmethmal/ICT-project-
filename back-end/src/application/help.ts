import Help from "../infrastructure/schemas/Help";
import { Request, Response, NextFunction } from "express";
import { createHelpDTO } from "../domain/dtos/help";
import { clerkClient } from "@clerk/express";
import { sendEmail } from "../utills/mailer";

export const createHelp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(400).json({ message: "Please provide a user ID" });
    return;
  }
  const clerkUser = await clerkClient.users.getUser(userId);
  if (!clerkUser) {
    res.status(400).json({ message: "Please provide a valid user ID" });
    return;
  }
  const newHelp = createHelpDTO.safeParse(req.body);
  if (!newHelp.success) {
    res.status(400).json({ message: newHelp.error });
    return;
  }

  const hasHelp = await Help.findOne({
    userId: clerkUser.id,
  });

  if (hasHelp) {
    res.status(400).json({
      message: "You already have a help request wait until it is resolved",
    });
    return;
  }
  const savedHelp = await Help.create({
    userId: clerkUser.id,
    name: newHelp.data.name,
    email: newHelp.data.email,
    subject: newHelp.data.subject,
    message: newHelp.data.message,
  });

  res.status(201).json(savedHelp);
};

export const getAllHelp = async (req: Request, res: Response) => {
  const help = await Help.find({});
  if (!help || help.length === 0) {
    res.json([]);
    return;
  }
  res.status(200).json(help);
  return;
};

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

export const replyToHelpRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { to, name, subject, message, reply, helpId } = req.body;

    if (!to || !reply || !helpId) {
      res
        .status(400)
        .json({ message: "Please provide all the required fields" });
      return;
    }

    await sendEmail({
      to,
      subject: `Reply: ${subject}`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f9f9f9; color: #2d2d2d;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 24px; border-radius: 10px; border: 1px solid #e5e7eb;">
        
        <h2 style="margin-bottom: 16px; color: #1a202c;">Hi ${name},</h2>
        
        <p style="font-size: 16px;">Thank you for reaching out to <strong>HotelzaAI Support</strong>. Here’s our response to your request:</p>

        <div style="margin-top: 20px;">
          <p style="font-weight: bold; margin-bottom: 6px;">Your original request:</p>
          <blockquote style="margin: 0; padding: 12px 16px; background-color: #f3f4f6; border-left: 4px solid #4b5563; border-radius: 4px; font-style: italic;">
            ${message}
          </blockquote>
        </div>

        <div style="margin-top: 24px;">
          <p style="font-weight: bold; margin-bottom: 6px;">Our response:</p>
          <p style="background-color: #fefefe; padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 4px; font-size: 15px;">
            ${reply}
          </p>
        </div>

        <p style="margin-top: 32px; font-size: 14px; color: #4b5563;">If you need further help, feel free to reach out again.</p>

        <p style="margin-top: 24px;">— <strong>HotelzaAI Support Team</strong></p>
      </div>
    </div>
  `,
    });

    await Help.findByIdAndDelete(helpId);

    res.status(200).json({ message: "Help request replied successfully" });
    return;
  } catch (error) {
    console.log("Error replying to help request", error);
    res.status(400).json({ message: "Has errors with sending email" });
    return;
  }
};
