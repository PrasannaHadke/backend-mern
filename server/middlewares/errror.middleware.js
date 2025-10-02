// middlewares/error.middleware.js
const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error caught in middleware:", err);

  // If error is from Zod validation
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        path: e.path[0], // field name
        message: e.message,
      })),
    });
  }

  // Generic error handler
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
