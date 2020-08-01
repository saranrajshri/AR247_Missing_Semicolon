const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedBackSchema = new Schema({
  supplierID: {
    type: String,
    required: true
  },
  customerID: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  orderID: {
    type: String,
    required: true
  },
  sentiment: {
    type: String
  }
});

var feedback = mongoose.model("feedback", FeedBackSchema);
module.exports = feedback;
