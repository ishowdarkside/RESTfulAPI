const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const Recipe = require(path.join(__dirname, "..", "models", "Recipe"));
const User = require(path.join(__dirname, "..", "models", "User"));
const Rating = require(path.join(__dirname, "..", "models", "Rating"));

exports.rateRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  if (!recipe)
    return next(
      new AppError("Can't post Review! No recipe found. Please try again!", 404)
    );
  const rating = await Rating.create({
    recipe: recipe.id,
    rating: req.body.rating,
    author: req.user.id,
    content: req.body.content,
  });
  res.status(201).json({
    status: "success",
    rating,
  });
});
