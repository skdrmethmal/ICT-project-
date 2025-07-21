import express from "express";
import {
  createHelp,
  getAllHelp,
  replyToHelpRequest,
} from "../application/help";
import isAuthenticated from "../middlewares/authentication-middleware";
import isAdmin from "../middlewares/authorization-middleware";

const helpRouter = express.Router();

helpRouter.post("/", isAuthenticated, createHelp);
helpRouter.get("/", getAllHelp);
helpRouter.post("/reply", isAuthenticated, replyToHelpRequest);
// helpRouter.delete("/:id", deleteHelp);

export default helpRouter;
