module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const status = err.statusCode || 500;
    return res.status(status).json({
      message: err.message,
      stack: err.stack,
      err,
    });
  } else if (process.env.NODE_ENV === "production") {
    const status = err.statusCode || 500;
    if (err.name === "ValidationError") {
      if (err.errors?.category?.path == "category") {
        return res.status(400).json({
          status: "fail",
          msg: `Whoops, invalid category...Check out ${req.protocol}://www.${req.hostname}/help/categories for more help. `,
        });
      }
      let msg = Object.values(err.errors)
        .map((el) => {
          return el.message;
        })
        .join(" ");

      return res.status(status).json({
        status: "fail",
        message: msg,
        stack: err.stack,
      });
    }

    if (err.isOperational) {
      return res.status(status).json({
        status: "fail",
        message: err.message,
      });
    }
    if (err.code === 11000) {
      let msg;
      if (err.keyPattern.email) {
        msg = "Email already in use, please try different one!";
      }
      if (err.keyPattern.recipe && !err.keyPattern.author) {
        msg = "Recipe with this title already exist. Please try different one!";
      }
      if (err.keyPattern.recipe && err.keyPattern.author) {
        msg = "You have already rated this recipe!";
      }
      return res.status(400).json({
        status: "fail",
        message: msg,
      });
    }
    if (err.name === "CastError") {
      return res.status(404).json({
        status: "fail",
        message: `Failed to query for ${err.value}`,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went really wrong!",
      });
    }
  }
};
