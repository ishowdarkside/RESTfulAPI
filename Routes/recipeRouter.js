const express = require("express");
const router = express.Router();
const path = require("path");
const recipeController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "recipeController"
));
const authController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router
  .route("/")
  .get(recipeController.getAllRecipes)
  .post(authController.protect, recipeController.createRecipe);
module.exports = router;
