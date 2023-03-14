const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
router.get("/comments/:id", commentController.comments);
router.post("/addComment", commentController.addComment);
module.exports = router;
