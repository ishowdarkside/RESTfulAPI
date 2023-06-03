const express = require("express");
const app = express();
const recipeRouter = require("./Routes/recipeRouter");

//Routing for Recipes
app.use("/recipes", recipeRouter);
module.exports = app;
