const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");

router.post("/sendPicture", pictureController.sendPicture);
module.exports = router;
