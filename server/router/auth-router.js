const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth-controllers");
const signupSchema = require("../validators/auth-validators");
const validate = require("../middlewares/validate_middleware");

router.route("/").get(authControllers.home);

router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);

router.route("/login").post(authControllers.loginUser);

module.exports = router;
