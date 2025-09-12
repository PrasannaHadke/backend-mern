const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth-controllers");

// ✅ define routes with controller functions
// router.get("/", authControllers.home);
router.route("/").get(authControllers.home)
router.route("/register").post(authControllers.register);
module.exports = router;