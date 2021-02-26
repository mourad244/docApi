const { Patient, validate } = require("../models/patient");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

// get all patients
router.get("/", async (req, res) => {
  const patients = await Patient.find().select("-__v");
  res.send(patients);
});
// ajouter patient
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

  let patient = new Patient({
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
  patient = await patient.save();

  res.send(patient);
});

// modifier patient
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
  const patient = await Patient.findByIdAndUpdate(
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

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.send(patient);
});
// get by id
router.get("/:id" /* , auth */, async (req, res) => {
  const patient = await Patient.findById(req.params.id).select("-__v");

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.send(patient);
});
// supprimer patient
router.delete("/:id", [auth, admin], async (req, res) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.send(patient);
});

module.exports = router;
