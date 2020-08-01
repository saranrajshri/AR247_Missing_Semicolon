const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderID: {
    type: String,
    required: true
  },
  customerData: {
    type: {},
    required: true
  },
  driverID: {
    type: String
  },
  supplierID: {
    type: String,
    required: true
  },
  tripData: {
    type: {},
    required: true
  },
  orderData: {
    type: {},
    required: true
  },
  isOrderAssigned: {
    type: Boolean,
    default: false
  },
  isOrderDispatched: {
    type: Boolean,
    default: false
  },
  isOrderDelivered: {
    type: Boolean,
    default: false
  },
  restTime: {
    type: {}
  },
  orderPickedTime: {
    type: String
  },
  orderDeliveredTime: {
    type: String
  },
  currentStatus: {
    type: {}
  }
});

var orders = mongoose.model("orders", OrderSchema);
module.exports = orders;
