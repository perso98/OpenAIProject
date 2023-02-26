const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");

router.post("/sendPicture", pictureController.sendPicture);
router.get("/getPictures", pictureController.getPictures);
module.exports = router;
