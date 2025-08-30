import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const AppRating = mongoose.model("AppRating", schema);

export default AppRating;
