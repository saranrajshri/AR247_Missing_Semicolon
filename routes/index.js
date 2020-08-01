const express = require("express");
const router = express.Router();

const product = require("./product/product");
// const driver = require("./driver/driver");
const order = require("./order/order");
const supplier = require("./supplier/supplier");
const verifiedSupplier = require("./verifiedSupplier/verifiedSupplier");
const customer = require("./customer/customer");
const verifyToken = require("../controllers/authController");

const config = require("../config/database.json")[
  process.env.NODE_ENV || "development"
];
// JWT Token
var jwt = require("jsonwebtoken");

// verified Supplier Routes
router.post("/verifiedSupplier/add", verifiedSupplier.add);

// Supplier Routes
router
  .post("/supplier/create", supplier.create)
  .post("/supplier/login", supplier.login)
  .get("/supplier/isAuthenticated", supplier.isSupplierAuthenticated)
  .get("/supplier/getMappings", supplier.getMappings)
  .post("/supplier/update/:supplierID", supplier.update);

// Product Routes
router
  .post("/supplier/product/add", product.add)
  .post("/supplier/product/update/:barCode", product.update)
  .post("/supplier/product/delete/:barCode/:supplierID", product.delete)
  .get(
    "/supplier/product/getProductsOfASupplier/:supplierID",
    product.getProductsOfASupplier
  )
  .get("/customer/product/getAll", product.getAll);

module.exports = router;
