const express = require("express");
const router = express.Router();
const linkControllers = require("../controllers/linkControllers");
const filesControllers = require("../controllers/filesControllers");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  [
    check("name", "Upload a File").not().isEmpty(),
    check("original_name", "Upload a File").not().isEmpty(),
  ],
  authMiddleware,
  linkControllers.newLink
);

router.get("/:url", 
linkControllers.getLink, 
filesControllers.deleteFile);
module.exports = router;
