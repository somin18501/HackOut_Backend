const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("userSchema", userSchema);

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  count: {
    patient: { type: Number, required: true },
    doctor: { type: Number, required: true },
    nurse: { type: Number, required: true },
  },
  coordinate: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  capacity: { type: Number, required: true },
});

const labSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cntSample: {
    red: { type: Number, required: true },
    yellow: { type: Number, required: true },
    green: { type: Number, required: true },
  },
  coordinate: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const medicalSchema = new Schema({
  name: {
    type: String, required: true,
  },
  address: {
    type: String, required: true,
  },
  loginId: {
    type: String, required: true,
  },
  password: {
    type: String, required: true,
  },
  medicine: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    count: { type: String, required: true },
  }],
  coordinate: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },

});

const hospital = mongoose.model("hospital", hospitalSchema);
const Lab = mongoose.model("lab", labSchema);
const Medical = mongoose.model("medical", medicalSchema);


module.exports = { User, hospital, Lab, Medical };
