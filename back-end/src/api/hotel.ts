import express from "express";
import {
  getAllHotels,
  getHotelById,
  addHotel,
  deleteHotel,
  updateHotel,
} from "../application/hotel";
import isAuthenticated from "../middlewares/authentication-middleware";
import isAdmin from "../middlewares/authorization-middleware";
const hotelsRouter = express.Router();

hotelsRouter.get("/", getAllHotels);
hotelsRouter.get("/:id", getHotelById);
hotelsRouter.post("/", isAuthenticated, isAdmin, addHotel);
hotelsRouter.delete("/:id", deleteHotel);
hotelsRouter.put("/:id", updateHotel);

export default hotelsRouter;
