const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");

router.post("/sendPicture", pictureController.sendPicture);
router.get("/getPictures", pictureController.getPictures);
router.post("/likePicture", pictureController.likePicture);
router.post("/dislikePicture", pictureController.dislikePicture);
module.exports = router;
