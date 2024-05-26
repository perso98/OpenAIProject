const { User } = require("../models");
const bcrypt = require("bcrypt");

// Funkcja sprawdzająca, czy użytkownik jest zalogowany
exports.getAuth = async (req, res) => {
  if (req.session.user) res.send({ user: req.session.user });
  else {
    res.send({ user: null });
  }
};

// Funkcja rejestrująca nowe konto
exports.registerAccount = async (req, res) => {
  const { login, password } = req.body;

  try {
    // Sprawdź, czy użytkownik o podanym loginie już istnieje
    const findUser = await User.findOne({ where: { login: login } });
    if (!findUser) {
      // Utwórz nowego użytkownika z zahashowanym hasłem
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

// Funkcja logowania użytkownika
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

// Funkcja wylogowująca użytkownika
exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};
