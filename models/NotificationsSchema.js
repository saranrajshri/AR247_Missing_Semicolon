const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  title: {
    type: String
  },
  message: {
    type: String
  },
  supplierID: {
    type: String
  },
  timeStamp: {
    type: String
  }
});

var notifications = mongoose.model("notifications", NotificationSchema);
module.exports = notifications;
