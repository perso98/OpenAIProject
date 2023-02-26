const { Picture, User } = require("../models");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
exports.sendPicture = async (req, res) => {
  const { url, text } = req.body;

  try {
    const response = await axios.get(url, { responseType: "stream" });
    const fileName = `${Date.now() + text}.png`;
    const filePath = path.join(__dirname, "..", "public", "uploads", fileName);
    const writeStream = fs.createWriteStream(filePath);
    response.data.pipe(writeStream);

    writeStream.on("finish", async () => {
      const picture = await Picture.create({
        url: `/uploads/${fileName}`,
        text: text,
        UserId: 1,
      });
      res.send({ success: true, picture });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getPictures = async (req, res) => {
  try {
    const pictures = await Picture.findAll({
      include: [{ model: User, required: true }],
    });
    res.send(pictures);
  } catch (err) {
    res.send(err);
  }
};
