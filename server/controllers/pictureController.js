const { Picture, User } = require("../models");
exports.sendPicture = async (req, res) => {
  const { url, text } = req.body;

  try {
    const pictureFinder = await Picture.findOne({ where: { url: url } });
    if (pictureFinder) res.send("This picture is already added");
    else await Picture.create({ url: url, text: text, UserId: 1 });
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
