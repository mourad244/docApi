const express = require("express");
const clients = require("../routes/clients");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const cors = require("cors");
var bodyparser = require("body-parser");

module.exports = function (app) {
  app.use(cors());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/docapi/clients", clients);
  app.use("/docapi/users", users);
  app.use("/docapi/auth", auth);
  app.use(error);
};
