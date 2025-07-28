import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../domain/errors/unauthorized-error";
import { log } from "console";

// interface AuthenticatedRequest extends Request {
//   auth?: {
//     userId?: string;
//   };
// }

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.auth?.userId) {
    throw new UnauthorizedError("Unauthorized");
  }

  next();
};

export default isAuthenticated;
