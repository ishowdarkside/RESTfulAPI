const app = require("./app");
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const DB = process.env.MONGODB_LINK.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Successfully connected to database!");
  })
  .catch((err) => {
    console.log("Something went wrong connecting to database");
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
