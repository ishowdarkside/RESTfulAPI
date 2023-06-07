const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      unique: [
        true,
        "Recipe with this title already exist.Please choose different",
      ],
      required: [true, "Please provide recipe title!"],
      minlength: [3, "Minimum length for title is 3 letters"],
      maxlength: [30, "Maximum length for title is 20 letters"],
    },
    description: {
      type: "String",
      required: [true, "Please provide description for your recipe!"],
    },
    ingredients: [
      {
        name: {
          type: "String",
          required: ["true", "Please provide ingridient name"],
        },
        quantity: {
          type: "String",
          required: ["true", "Please provide ingridient quanitity"],
        },
      },
    ],
    cookingTime: {
      type: Number,
      required: [true, "Please provide cooking time for your recipe!"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      enum: [
        "soup",
        "fast food",
        "italian cuisine",
        "mexican cuisine",
        "chinese cuisine",
        "indian cuisine",
        "japanese cuisine",
        "mediterranean cuisine",
        "middle Eastern cuisine",
        "thai cuisine",
        "greek cuisine",
        "french cuisine",
        "american cuisine",
        "barbecue",
        "seafood",
        "vegetarian",
        "gluten-free",
        "desserts",
        "breakfast",
        "salads",
        "sandwiches",
        "pizza",
        "steaks",
        "sushi",
        "pasta",
        "noodles",
      ],
    },
    ratings: [{ type: mongoose.Schema.ObjectId, ref: "Rating" }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

RecipeSchema.statics.checkFields = function (body) {
  const currentFields = Object.keys(body);
  if (
    !currentFields.includes("title") ||
    !currentFields.includes("description") ||
    !currentFields.includes("ingredients") ||
    !currentFields.includes("cookingTime") ||
    !currentFields.includes("category")
  ) {
    return false;
  } else return true;
};

RecipeSchema.virtual("avgRating").get(function () {
  return this.ratings.reduce(
    (acc, obj) =>
      parseFloat(((acc + +obj?.rating) / this.ratings.length).toFixed(1)),
    0
  );
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
