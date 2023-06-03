const express = require("express");
const app = express();
const recipeRouter = require("./Routes/recipeRouter");
const errorMiddleware = require("./controllers/errorController");
//Parsing incoming data
app.use(express.json());

//Routing for Recipes
app.use("/recipes", recipeRouter);

//Global Error Middleware
app.use(errorMiddleware);
module.exports = app;
