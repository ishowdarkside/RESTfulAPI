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

//Route for getting all recipes and creating recipe
router
  .route("/")
  .get(recipeController.getAllRecipes)
  .post(authController.protect, recipeController.createRecipe);

//route for querying for recipe by its id.
router.route("/recipe/:recipeId").get(recipeController.getRecipeById);

//route for querying for recipes by category
router.get("/category/:category", recipeController.getRecipeByCategory);
module.exports = router;
