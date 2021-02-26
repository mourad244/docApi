const { Client, validate } = require("../models/client");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const clients = await Client.find().select("-__v");
  res.send(clients);
});
// ajouter client
router.post("/" /* , auth */, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    fName,
    lName,
    phone,
    email,
    fonction,
    familySituation,
    dateOfBirth,
    address,
    sex,
  } = req.body;

  let client = new Client({
    fName: fName,
    lName: lName,
    phone: phone,
    email: email,
    fonction: fonction,
    familySituation: familySituation,
    dateOfBirth: dateOfBirth,
    address: address,
    sex: sex,
  });
  client = await client.save();

  res.send(client);
});

// modifier client
router.put("/:id" /* , auth */, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    fName,
    lName,
    phone,
    email,
    fonction,
    familySituation,
    dateOfBirth,
    address,
    sex,
  } = req.body;
  const client = await Client.findByIdAndUpdate(
    req.params.id,
    {
      fName: fName,
      lName: lName,
      phone: phone,
      email: email,
      fonction: fonction,
      familySituation: familySituation,
      dateOfBirth: dateOfBirth,
      address: address,
      sex: sex,
    },
    { new: true }
  );

  if (!client)
    return res.status(404).send("The client with the given ID was not found.");

  res.send(client);
});
// get by id
router.get("/:id" /* , auth */, async (req, res) => {
  const client = await Client.findById(req.params.id).select("-__v");

  if (!client)
    return res.status(404).send("The client with the given ID was not found.");

  res.send(client);
});
// supprimer client
router.delete("/:id", [auth, admin], async (req, res) => {
  const client = await Client.findByIdAndRemove(req.params.id);

  if (!client)
    return res.status(404).send("The client with the given ID was not found.");

  res.send(client);
});

module.exports = router;
