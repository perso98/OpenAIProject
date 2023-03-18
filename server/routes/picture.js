const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");

router.get("/getPictures", pictureController.getPictures);
router.get("/getFavorites", pictureController.getFavorites);
router.post("/sendPicture", pictureController.sendPicture);
router.post("/likePicture", pictureController.likePicture);
router.post("/dislikePicture", pictureController.dislikePicture);
router.get("/getUserPictures", pictureController.getUserPictures);
router.get("/getAllPictures", pictureController.getAllPictures);
router.put("/changeStatus", pictureController.changeStatus);
module.exports = router;
