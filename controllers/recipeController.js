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

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * 10;
  const recipes = await Recipe.find().limit(10).skip(skip);
  res.status(200).json({
    status: "success",
    data: recipes,
  });
});

exports.getRecipeByCategory = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const skip = (page - 1) * 10;
  const recipes = await Recipe.find({ category: req.params.category })
    .limit(10)
    .skip(skip);
  if (recipes.length === 0)
    return next(new AppError("No recipes found for this category!"));
  res.status(200).json({
    status: "success",
    data: recipes,
  });
});

exports.createRecipe = catchAsync(async (req, res, next) => {
  //Static method on model for checking if all fields are provided.
  if (!Recipe.checkFields(req.body))
    return next(new AppError("Please provide all fields", 400));

  const user = await User.findById(req.user.id);
  let recipe = await Recipe.create({
    title: req.body.title,
    description: req.body.description,
    ingridients: req.body.ingridients,
    author: req.user.id,
    cookingTime: req.body.cookingTime,
    category: req.body.category,
  });

  user.recipesTotal++;
  user.recipes.push(recipe.id);
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Recipe created successfully!",
    data: recipe,
  });
});

exports.getRecipeById = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.recipeId).populate({
    path: "author",
    select: "name",
  });
  if (!recipe) return next(new AppError("Recipe not found!", 404));

  res.status(200).json({
    status: "success",
    data: recipe,
  });
});
