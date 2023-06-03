const express = require("express");
const router = express.Router();
const path = require("path");
const recipeController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "recipeController"
));

router
  .route("/")
  .get(recipeController.getAllRecipes)
  .post(recipeController.createRecipe);
module.exports = router;
