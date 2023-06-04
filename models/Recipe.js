const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema({
  title: {
    type: "String",
    unique: [
      true,
      "Recipe with this title already exist.Please choose different",
    ],
    required: [true, "Please provide recipe title!"],
    minlength: [3, "Minimum length for title is 3 letters"],
    maxlength: [20, "Maximum length for title is 20 letters"],
  },
  description: {
    type: "String",
    required: [true, "Please provide description for your recipe!"],
  },
  ingridients: [
    [
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
  ],
  cookingTime: {
    type: Number,
    required: [true, "Please provide cooking time for your recipe!"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

RecipeSchema.statics.checkFields = function (body) {
  const currentFields = Object.keys(body);
  if (
    !currentFields.includes("title") ||
    !currentFields.includes("description") ||
    !currentFields.includes("ingridients") ||
    !currentFields.includes("cookingTime")
  ) {
    return false;
  } else return true;
};

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
