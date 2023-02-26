const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getAuth", userController.getAuth);
router.post("/registerAccount", userController.registerAccount);
router.post("/loginToAccount", userController.loginToAccount);
router.post("/logout", userController.logout);

module.exports = router;
