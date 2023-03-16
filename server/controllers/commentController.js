const { Comment, User, Picture } = require("../models");

exports.addComment = async (req, res) => {
  const { id, text } = req.body;
  try {
    const newComment = await Comment.create({
      PictureId: id,
      text: text,
      UserId: req.session.user.id,
    });

    res.send({ user: req.session.user, comment: newComment.dataValues });
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
      include: [{ model: User }, { model: Picture }],
    });
    res.send(comments);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.body;
  try {
    await Comment.destroy({ where: { id } });
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};
