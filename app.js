const express = require("express");
const app = express();
const recipeRouter = require("./Routes/recipeRouter");
const UserRouter = require("./Routes/userRouter");
const ratingRouter = require("./Routes/ratingRouter");
const errorMiddleware = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
//Parsing incoming data
app.use(express.json());
//Parsing cookies
app.use(cookieParser());

//Routing for Recipes
app.use("/api/v1/recipes", recipeRouter);
//Routing for Users
app.use("/api/v1/users", UserRouter);
//Routing for Ratings
app.use("/api/v1/ratings", ratingRouter);

app.use(errorMiddleware);

//handling unhandled routes
app.use("*", (req, res, next) => {
  res.status(400).json({
    status: "fail",
    message: "Woah, route not found!",
  });
});
//Global Error Middleware
module.exports = app;
