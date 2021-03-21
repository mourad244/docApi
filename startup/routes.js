const express = require("express");
const auth = require("../routes/auth");
const patients = require("../routes/patients");
const users = require("../routes/users");
const appointments = require("../routes/appointments");
const error = require("../middleware/error");
const cors = require("cors");
var bodyparser = require("body-parser");

module.exports = function (app) {
  app.use(cors());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/docapi/patients", patients);
  app.use("/docapi/appointments", appointments);
  app.use("/docapi/users", users);
  app.use("/docapi/auth", auth);
  app.use(error);
};
