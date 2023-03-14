const { Comment, User } = require("../models");

exports.addComment = async (req, res) => {
  const { id, text } = req.body;
  try {
    const newComment = await Comment.create({
      PictureId: id,
      text: text,
      UserId: req.session.user.id,
    });
    console.log(newComment.dataValues.createdAt);
    res.send({ user: req.session.user.login, comment: newComment.dataValues });
  } catch (err) {
    res.send({ message: err });
    console.log(err);
  }
};

exports.comments = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { PictureId: id },
      include: [{ model: User }],
    });
    res.send(comments);
  } catch (err) {
    res.send(err);
  }
};
