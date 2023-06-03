module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const status = err.statusCode || 500;
    return res.status(status).json({
      err,
    });
  } else if (process.env.NODE_ENV === "production") {
    const status = err.statusCode || 500;
    if (err.name === "ValidationError") {
      const msg = Object.values(err.errors)
        .map((el) => {
          return el.message;
        })
        .join(" ");
      return res.status(status).json({
        status: "fail",
        message: msg,
      });
    }
    if (err.isOperational) {
      return res.status(status).json({
        status: "fail",
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went really wrong!",
      });
    }
  }
};
