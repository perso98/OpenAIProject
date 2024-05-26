const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const aiRoute = require("./routes/ai");
const pictureRoute = require("./routes/picture");
const commentRoute = require("./routes/comment");
const userRoute = require("./routes/user");
const app = express();
require('dotenv').config();
const session = require("express-session");
const path = require("path");
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
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Origin"],
  })
);
app.use("/ai", aiRoute);
app.use("/picture", pictureRoute);
app.use("/user", userRoute);
app.use("/comment", commentRoute);
const port = 3001;
sequelize.sync().then(() => {
  console.log("Database synchronized");
});
app.listen(port, () => {
  console.log("Server is working on port ", port);
});
