import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hotelEmail: {
    type: String,
    required: true,
    default: "methmald1222@gmail.com",
  },
  location: {
    type: String,
    required: true,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stripePriceId: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
