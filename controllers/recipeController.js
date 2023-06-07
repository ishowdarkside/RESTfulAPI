const { exec } = require("child_process");
const exp = require("constants");
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
const Rating = require(path.join(__dirname, "..", "models", "Recipe"));

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const skip = (page - 1) * 10;
  const recipes = await Recipe.find().limit(10).skip(skip);
  res.status(200).json({
    status: "success",
    page,
    results: recipes.length,
    data: recipes,
  });
});

exports.getRecipeByCategory = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const skip = (page - 1) * 10;
  if (req.params.category.includes("-"))
    req.params.category = req.params.category.split("-").join(" ");
  console.log(req.params.category);

  const recipes = await Recipe.find({ category: req.params.category })
    .limit(10)
    .skip(skip)
    .populate({ path: "author", select: "name" });

  res.status(200).json({
    status: "success",
    page,
    results: recipes.length,
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
    ingredients: req.body.ingredients,
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
  const recipe = await Recipe.findById(req.params.recipeId)
    .populate({
      path: "author",
      select: "name",
    })
    .populate({ path: "ratings", select: "rating" });

  if (!recipe) return next(new AppError("Recipe not found!", 404));

  res.status(200).json({
    status: "success",
    data: recipe,
  });
});

exports.getMyRecipes = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find({ author: req.user.id });
  res.status(200).json({
    status: "success",
    results: recipes.length,
    data: recipes,
  });
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  if (!recipe.author.equals(req.user.id))
    return next(
      new AppError("You don't have permission to preform this operation", 401)
    );
  await recipe.deleteOne();
  res.status(204).json({
    status: "success",
  });
});

exports.updateRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  if (!recipe) return next(new AppError("Recipe not found!", 404));
  if (!recipe.author.equals(req.user.id))
    return next(
      new AppError("You don't have permission to preform this operation!", 401)
    );
  const exeptions = ["author", "ratings"];

  if (exeptions.some((el) => req.body[el]))
    return next(
      new AppError(
        `You can't change certain properties like author or ratings`,
        400
      )
    );

  Object.entries(req.body).forEach((el) => {
    recipe[el[0]] = el[1];
  });
  console.log(req.body);
  await recipe.save({ validateBeforeSave: true });
  res.status(200).json({
    status: "success",
    message: "Recipe updated successfully!",
  });
});
