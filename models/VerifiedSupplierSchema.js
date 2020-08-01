const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VerifiedSupplierSchema = new Schema({
  supplierName: {
    type: String
  },
  designation: {
    type: String
  },
  agencyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  faxNumber: {
    type: String
  }
});

const verifiedSupplier = mongoose.model(
  "verifiedSupplier",
  VerifiedSupplierSchema
);
module.exports = verifiedSupplier;
