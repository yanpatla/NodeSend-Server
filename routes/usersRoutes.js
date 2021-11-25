const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const { check } = require("express-validator");

router.post(
  "/",

  [
    check("name", "The Name is Mandatory").not().isEmpty(),

    check("email", "Put a valid E-mail").isEmail(),
    check("password", "Password must be min 6 characters").isLength({ min: 6 }),
  ],

  usersControllers.newUser
);

module.exports = router;
