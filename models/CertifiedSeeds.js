const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CertifiedSeedsSchema = new Schema({
  certificateNumber: {
    type: String,
    required: true
  },
  tagNumber: {
    type: String,
    required: true
  },
  issuedAt: {
    type: String,
    required: true
  },
  expiresAt: {
    type: String,
    required: true
  },
  supplierID: {
    type: String,
    required: true
  }
});

var certifiedSeeds = mongoose.model("certifiedSeeds", CertifiedSeedsSchema);
module.exports = certifiedSeeds;
