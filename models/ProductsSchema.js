const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  barCode: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true
  },
  supplierID: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  isHidden: {
    type: Boolean,
    default: false
  }
});

const product = mongoose.model("product", Product);
module.exports = product;
