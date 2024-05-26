const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const aiRoute = require("./routes/ai");
const pictureRoute = require("./routes/picture");
const commentRoute = require("./routes/comment");
const userRoute = require("./routes/user");
const app = express();
require('dotenv').config(); // Załadowanie zmiennych środowiskowych z pliku .env
const session = require("express-session");
const path = require("path");

// Konfiguracja sesji
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Ustawienie statycznego katalogu dla plików przesłanych
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// Middleware do obsługi JSON i URL encoded danych
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfiguracja CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Origin"],
  })
);

// Definiowanie routow
app.use("/ai", aiRoute);
app.use("/picture", pictureRoute);
app.use("/user", userRoute);
app.use("/comment", commentRoute);
const port = 3001;

// Synchronizacja bazy danych
sequelize.sync().then(() => {
  console.log("Database synchronized");
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log("Server is working on port ", port);
});
