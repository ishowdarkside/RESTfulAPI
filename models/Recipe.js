const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema({
  title: {
    type: "String",
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
      { type: "String", required: ["true", "Please provide ingridient name"] },
      {
        type: "String",
        required: ["true", "Please provide ingridient quanitity"],
      },
    ],
  ],
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
