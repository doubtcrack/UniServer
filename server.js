const express = require("express");
require("dotenv").config();
const connection = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const cors = require("cors");
const path = require("path");

// body parser middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// cors
app.use(cors());

// router
app.use("/api", require("./routes/adRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// error handler
app.use(errorHandler);

// db connection
connection();

//serve static file
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
  // app.use(express.static(path.join(__dirname, "server_files")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "server_files", "index.html"));
  // });
} else {
  app.get("*", (req, res) => {
    res.send("UniConnect");
  });
}
// console.log(path.join(__dirname, "build", "uploads"));
const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Server running on ${port}`));
