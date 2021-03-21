const { Patient } = require("../models/patient");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const validations = require("../startup/validations");

const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const router = express.Router();

// get all patients
router.get("/", async (req, res) => {
  const patients = await Patient.find().select("-__v");

  // add age
  patients.map((patient) => {
    patient.age = moment().diff(patient.birthDate, "years");
  });
  res.send(patients);
});
// ajouter patient
router.post("/", auth, async (req, res) => {
  const { error } = validations.patient(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    fName,
    lName,
    phone,
    email,
    fonction,
    familySituation,
    birthDate,
    address,
    gender,
  } = req.body;

  let patient = new Patient({
    fName: fName,
    lName: lName,
    phone: phone,
    email: email,
    fonction: fonction,
    familySituation: familySituation,
    birthDate: birthDate,
    address: address,
    gender: gender,
  });
  patient = await patient.save();

  res.send(patient);
});

// modifier patient
router.put("/:id", auth, async (req, res) => {
  const { error } = validations.patient(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    fName,
    lName,
    phone,
    email,
    fonction,
    familySituation,
    birthDate,
    address,
    gender,
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
      birthDate: birthDate,
      address: address,
      gender: gender,
    },
    { new: true }
  );

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.send(patient);
});
// get by id
router.get("/:id", validateObjectId, auth, async (req, res) => {
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
