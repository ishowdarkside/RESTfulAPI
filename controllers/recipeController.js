const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const Recipe = require(path.join(__dirname, "..", "models", "Recipe"));

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find();
  res.status(200).json({
    status: "success",
    data: recipes,
  });
});

exports.createRecipe = catchAsync(async (req, res, next) => {
  //Static method on model for checking if all fields are provided.
  if (!Recipe.checkFields(req.body))
    return next(new AppError("Please provide all fields", 400));

  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingridients: req.body.ingridients,
    author: req.user.id,
    cookingTime: req.body.cookingTime,
  });

  await recipe.save({ validateBeforeSave: "true" });
  res.status(200).json({
    status: "success",
    message: "Recipe created successfully!",
    data: recipe,
  });
});
