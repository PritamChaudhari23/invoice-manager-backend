const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({ message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for ${err.path}` });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({ message: `${field} already exists` });
  }

  const status = err.statusCode || 500;

  if (status === 500) {
    console.error(err);
  }

  return res.status(status).json({
    message: status === 500 ? "Internal server error" : err.message,
  });
};

module.exports = errorHandler;
