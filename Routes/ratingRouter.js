const express = require("express");
const path = require("path");
const router = express.Router();

const ratingController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "ratingController"
));
const authController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router
  .route("/:recipeId")
  .post(authController.protect, ratingController.rateRecipe);

module.exports = router;
