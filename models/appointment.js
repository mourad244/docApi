const mongoose = require("mongoose");

//title start end description patient type(consultation ou controle) honnore(boolean)
// title startTime endTime description patient type
const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  description: {
    type: String,
  },
  patient: {
    type: new mongoose.Schema({
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
      gender: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  honnore: {
    type: Boolean,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

exports.appointmentSchema = appointmentSchema;
exports.Appointment = Appointment;
