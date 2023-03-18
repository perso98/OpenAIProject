const { Picture, User, Like } = require("../models");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
exports.sendPicture = async (req, res) => {
  const { url, text, status } = req.body;

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
        public: status,
        UserId: req.session.user.id,
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
    if (req.session.user) {
      const pictures = await Picture.findAll({
        include: [
          {
            model: User,
            required: true,
          },
          {
            model: Like,
            required: false,
          },
        ],
        where: {
          public: 1,
          id: {
            [Op.notIn]: Sequelize.literal(
              `(SELECT PictureId FROM Likes WHERE UserId = ${req.session.user.id})`
            ),
          },
          UserId: {
            [Op.ne]: req.session.user.id,
          },
        },
      });
      res.send(pictures);
    } else {
      const pictures = await Picture.findAll({
        where: { public: 1 },
        include: [
          {
            model: User,
            required: true,
          },
          {
            model: Like,
            required: false,
          },
        ],
      });
      res.send(pictures);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getUserPictures = async (req, res) => {
  const pictures = await Picture.findAll({
    include: [
      {
        model: User,
        required: true,
      },
      {
        model: Like,
        required: false,
      },
    ],
    where: {
      UserId: {
        [Op.eq]: req.session.user.id,
      },
    },
  });
  res.send(pictures);
};

exports.getFavorites = async (req, res) => {
  const pictures = await Picture.findAll({
    include: [
      {
        model: User,
        required: true,
      },
      {
        model: Like,
        required: false,
      },
    ],
    where: {
      public: 1,
      id: {
        [Op.in]: Sequelize.literal(
          `(SELECT PictureId FROM Likes WHERE UserId = ${req.session.user.id})`
        ),
      },
      UserId: {
        [Op.ne]: req.session.user.id,
      },
    },
  });
  res.send(pictures);
};

exports.likePicture = async (req, res) => {
  const { id } = req.body;

  try {
    const like = await Like.create({
      PictureId: id,
      UserId: req.session.user.id,
    });
    res.send(like);
  } catch (err) {
    console.log(err);
  }
};

exports.dislikePicture = async (req, res) => {
  const { id } = req.body;

  try {
    await Like.destroy({
      where: {
        PictureId: id,
        UserId: req.session.user.id,
      },
    });
    res.send({ message: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllPictures = async (req, res) => {
  try {
    const pictures = await Picture.findAll({
      where: { public: 1 },
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Like,
          required: false,
        },
      ],
    });
    res.send(pictures);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.changeStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    await Picture.update({ public: status }, { where: { id } });
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
    console.log(err);
  }
};
