const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  customerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: [],
    default: []
  }
});

var customer = mongoose.model("customer", CustomerSchema);
module.exports = customer;
