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

exports.getUserData = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate("recipes")
    .select("name recipes");
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json({
    status: "success",
    data: user,
  });
});
