const { User } = require("../models");
const bcrypt = require("bcrypt");
exports.getAuth = async (req, res) => {
  if (req.session.user) res.send({ user: req.session.user });
  else {
    res.send({ user: null });
  }
};

exports.registerAccount = async (req, res) => {
  const { login, password } = req.body;

  try {
    const findUser = await User.findOne({ where: { login: login } });
    if (!findUser) {
      await User.create({
        login: login,
        password: await bcrypt.hash(password, 10),
      });
      res.send({ registered: true });
    } else {
      res.send({ registered: false });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Some error" });
  }
};

exports.loginToAccount = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({
      where: { login: login },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.send({ user: user });
    } else {
      res.send({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Some error" });
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    next();
  } catch (err) {
    console.log(err);
  }
};
