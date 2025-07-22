import User from "../infrastructure/schemas/User";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.email) {
    res.status(400).send("Please provide all the required fields");
    return;
  }
  await User.create({
    name: newUser.name,
    email: newUser.email,
  });
  res.status(201).json(newUser);
  return;
};
