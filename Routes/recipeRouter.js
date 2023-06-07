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

//route for querying for current user recipes
router.get("/myRecipes", authController.protect, recipeController.getMyRecipes);

//Delete recipe with its id
router.delete(
  "/deleteRecipe/:recipeId",
  authController.protect,
  recipeController.deleteRecipe
);

router.post(
  "/recipe/rate-recipe/:recipeId",
  authController.protect,
  recipeController.rateRecipe
);

module.exports = router;
