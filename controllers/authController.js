const path = require("path");
const User = require(path.join(__dirname, "..", "models", "User"));
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const jwt = require("jsonwebtoken");
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const bcrypt = require("bcrypt");

const signToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name)
    return next(new AppError("Provide all fields!", 401));

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });

  const token = await signToken(user.id);
  res.set("Authorization", `Bearer ${token}`);
  res.status(201).json({
    status: "success",
    message: "Account created successfully!",
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError("Please provide all fields", 401));
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("Invalid email/password", 401));
  const compared = await bcrypt.compare(req.body.password, user.password);
  if (!compared) return next(new AppError("Invalid email/password", 401));
  const token = await signToken(user.id);
  res.set("Authorization", `Bearer ${token}`);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    status: "success",
    message: "logged in successfully!",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;
  if (!token) return next(new AppError("Please login!", 401));
  const verified = await jwt.verify(token, process.env.JWT_SECRET);
  if (!verified)
    return next(new AppError("Invalid token, please login again!", 401));
  const user = await User.findById(verified.id);
  if (!user)
    return next(
      new AppError("The user associated with the token no longer exists.", 401)
    );
  if (!user.checkJWTValidity(verified.iat))
    return next(
      new AppError(
        "Password changed after token was issued.Please login again!",
        401
      )
    );

  req.user = user;
  next();
});
