const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (error) {
    // Zod validation errors
    console.log(error);
    if (error.errors) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."), // which field failed
          message: err.message,      // readable message
        })),
      });
    }

    // Other errors
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = validate;
