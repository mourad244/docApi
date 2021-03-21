const { Appointment } = require("../models/appointment");
const auth = require("../middleware/auth");
const express = require("express");
const { Patient } = require("../models/patient");
const validations = require("../startup/validations");

const router = express.Router();

const validateObjectId = require("../middleware/validateObjectId");

router.get("/", auth, async (req, res) => {
  const appointments = await Appointment.find()
    .select("-__v")
    .sort("startTime");
  res.send(appointments);
});

router.get("/:id", auth, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).select("-__v");
  if (!appointment) return res.status(404).send("rendez vous n'existe pas");
  res.send(appointment);
});

router.post("/", auth, async (req, res) => {
  const { error } = validations.appointment(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const patient = await Patient.findById(req.body.patientId);
  if (!patient) return res.status(400).send("id patient non validé.");

  // title startTime endTime description patient type
  const { title, startTime, endTime, description, type, honnore } = req.body;

  const appointment = new Appointment({
    title: title,
    startTime: startTime,
    endTime: endTime,
    description: description,
    patient: {
      _id: patient._id,
      fName: patient.fName,
      lName: patient.lName,
      gender: patient.gender,
      phone: patient.phone,
    },
    type: type,
    honnore: honnore,
  });

  // ajouter au patient un rendez vous
  patient.appointments.push({
    _id: appointment._id,
    startTime: startTime,
    type: type,
    honnore: honnore,
  });
  await appointment.save();
  await patient.save();
  res.send(appointment);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validations.appointment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const patient = await Patient.findById(req.body.patientId);
  if (!patient) return res.status(400).send("id patient non validé.");
  const { title, startTime, endTime, description, type, honnore } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
      patient: {
        _id: patient._id,
        fName: patient.fName,
        lName: patient.lName,
        gender: patient.gender,
        phone: patient.phone,
      },
      type: type,
      honnore: honnore,
    },
    { new: true }
  );
  await appointment.save();

  if (!appointment)
    return res.status(404).send("rendez vous avec cet id n'existe pas");

  res.send(appointment);
});

router.get("/:id", validateObjectId, auth, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).select("-__v");

  if (!appointment)
    return res.status(404).send("le rendez vous avec cet id n'existe pas");
});

router.delete("/:id", auth, async (req, res) => {
  const appointment = await Appointment.findByIdAndRemove(req.params.id);
  if (!appointment)
    return res.status(404).send("rendez vous avec cette id n'existe pas");
});

module.exports = router;
