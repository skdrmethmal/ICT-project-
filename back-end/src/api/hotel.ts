import express from "express";
import {
  getAllHotels,
  getHotelById,
  addHotel,
  deleteHotel,
  updateHotel,
  Generate,
} from "../application/hotel";
import { createEmbeddings } from "../application/embeddings";
import isAuthenticated from "../middlewares/authentication-middleware";
import isAdmin from "../middlewares/authorization-middleware";
import { retrieveByQuery } from "../application/retrieve";
const hotelsRouter = express.Router();

hotelsRouter.get("/", getAllHotels);
hotelsRouter.get("/:id", getHotelById);
hotelsRouter.post("/", isAuthenticated, isAdmin, addHotel);
hotelsRouter.delete("/:id", isAuthenticated, isAdmin, deleteHotel);
hotelsRouter.put("/:id", isAuthenticated, isAdmin, updateHotel);
hotelsRouter.post("/embeddings/create", createEmbeddings);
hotelsRouter.get("/search/retrieve", retrieveByQuery);
hotelsRouter.post("/generate", Generate);

export default hotelsRouter;
