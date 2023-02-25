const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
router.post("/getAnswer", aiController.getAnswer);
router.post("/generatePhoto", aiController.generatePhoto);
module.exports = router;
