const express = require("express");
const urlRoutes = require("./src/routes");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();

db();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("hello, youre short");
});

app.use("/api/v1/shorturls", urlRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
