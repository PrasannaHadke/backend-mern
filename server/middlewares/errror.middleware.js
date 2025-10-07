// middlewares/error.middleware.js
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server Error";

  let messages = [];

  try {
    if (err.extraDetails) {
      // If extraDetails is an array, join to string
      const jsonString = Array.isArray(err.extraDetails)
        ? err.extraDetails.join("")
        : err.extraDetails;

      const parsed = JSON.parse(jsonString);

      // Extract only message fields
      messages = parsed.map((item) => item.message);
    }
  } catch (parseError) {
    console.error("Error parsing extraDetails:", parseError);
    messages = [err.extraDetails || "Invalid input"];
  }

  console.error(`[${req.method}] ${req.path} >> Status: ${status}, Message: ${message}`);

  return res.status(status).json({
    success: false,
    message,
    errors: messages, // frontend gets only messages array
  });
};

module.exports = errorMiddleware;
