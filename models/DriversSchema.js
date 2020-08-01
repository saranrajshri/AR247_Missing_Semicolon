const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  driverName: {
    type: String,
    required: true
  },
  driverID: {
    type: String
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  primaryContact: {
    type: String,
    required: true
  },
  secondaryContact: {
    type: String
  },
  driverAddress: {
    type: String,
    required: true
  },
  supplierID: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: true
  }
});

var driver = mongoose.model("driver", DriverSchema);
module.exports = driver;
