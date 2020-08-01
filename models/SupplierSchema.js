const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  supplierName: {
    type: String,
    required: true
  },
  agencyName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  faxNumber: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  wareHouse: {
    type: {},
    default: {}
  }
});

var supplier = mongoose.model("supplier", SupplierSchema);
module.exports = supplier;
