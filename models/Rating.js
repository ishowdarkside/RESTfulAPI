const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  rating: {
    type: Number,
    required: [true, "Please provide recipe rating!"],
    min: 1,
    max: 5,
  },
  recipe: {
    type: mongoose.Schema.ObjectId,
    ref: "Recipe",
  },
  content: {
    type: String,
  },
});

ratingSchema.index({ author: 1, recipe: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
