const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require("moment");

const patientSchema = new mongoose.Schema({
  cin: {
    type: String,
    minlength: 3,
    maxlength: 10,
  },
  fName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lName: {
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
    // required: true,
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
  birthDate: {
    type: Date,
  },
  address: {
    type: String,
    maxlength: 255,
  },
  gender: {
    type: String,
    required: true,
  },
  age: Number,
  appointments: [
    {
      type: new mongoose.Schema({
        startTime: {
          type: Date,
        },
        type: {
          type: String,
          trim: true,
        },
        honnore: {
          type: Boolean,
        },
      }),
    },
  ],
});

//nom,prenom,Numero TEl, Mutuelle, email, fonction, situation familiale, date naissance, adress,gender

const Patient = mongoose.model("Patient", patientSchema);

exports.patientSchema = patientSchema;
exports.Patient = Patient;
