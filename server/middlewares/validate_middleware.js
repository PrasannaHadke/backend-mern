// middlewares/validate.middleware.js
const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    // Zod validation errors
    if (err.errors && err.errors.length > 0) {
      next({
        status: 422,
        message: "Validation failed",
        extraDetails: err.errors.map((e) => e.message),
      });
    } else {
      next({
        status: 500,
        message: "Unexpected error during validation",
        extraDetails: err.message,
      });
    }
  }
};

module.exports = validate;
