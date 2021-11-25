const express = require("express");
const router = express.Router();
const filesControllers = require("../controllers/filesControllers");
const authMiddleware = require("../middleware/authMiddleware");



router.post("/",authMiddleware , filesControllers.uploadFile);

 

module.exports = router;
