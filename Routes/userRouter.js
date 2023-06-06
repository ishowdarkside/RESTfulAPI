const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));
const userController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "userController"
));

//LOGIN/SIGNUP OPERATIONS
router.post("/signup", authController.signup);
router.post("/login", authController.login);

//GET USER DATA BASED ON ID
router.get("/user/:userId", authController.protect, userController.getUserData);
module.exports = router;
