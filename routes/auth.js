const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  [
    check("email", "Put a Valid Email").isEmail(),
    check("password", "Put a Valid Password").not().isEmpty(),
  ],
  authControllers.authenticateUser
);

router.get("/", authMiddleware, authControllers.authenticatedUser);

module.exports = router;
