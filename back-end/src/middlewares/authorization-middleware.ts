import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../domain/errors/forbidden-error";

interface AuthenticatedRequest extends Request {
  auth?: {
    sessionClaims?: { metadata?: { role: "admin" } };
  };
}
const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.auth?.sessionClaims?.metadata?.role !== "admin") {
    throw new ForbiddenError("Forbidden");
  }
  next();
};

export default isAdmin;
