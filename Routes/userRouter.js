const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
