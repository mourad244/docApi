const Joi = require("joi");
const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  LName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  fonction: {
    type: String,
    maxlength: 50,
  },
  familySituation: {
    type: String,
    maxlength: 50,
  },
  dateOfBirth: {
    type: Date,
  },
  address: {
    type: String,
    maxlength: 255,
  },
  sex: {
    type: String,
    required: true,
  },
});
//nom,prenom,Numero TEl, Mutuelle, email, fonction, situation familiale, date naissance, adress,sex

const Patient = mongoose.model("Patient", patientSchema);

function validatePatient(patient) {
  const schema = Joi.object({
    fName: Joi.string().min(3).max(50).required(),
    lName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    fonction: Joi.string().max(50),
    familySituation: Joi.string().max(50),
    sex: Joi.string().required(),
  });

  return schema.validate(patient);
}

exports.patientSchema = patientSchema;
exports.Patient = Patient;
exports.validatePatient = validatePatient;
