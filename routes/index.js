const express = require("express");
const router = express.Router();

const product = require("./product/product");
const driver = require("./driver/driver");
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
  .post("/supplier/update/:supplierID", supplier.update)
  .post("/supplier/getNotification", supplier.getNotifications);

// Product Routes
router
  .post("/supplier/product/add", product.add)
  .post("/supplier/product/update/:barCode", product.update)
  .post("/supplier/product/delete/:barCode/:supplierID", product.delete)
  .get(
    "/supplier/product/getProductsOfASupplier/:supplierID",
    product.getProductsOfASupplier
  )
  .post("/supplier/addCertifiedSeeds", product.addCertifiedSeed)
  .get(
    "/supplier/getCertifiedSeedsOfSupplier/:supplierID",
    product.getCertifiedSeedsOfASupplier
  )
  .get("/customer/product/getAll", product.getAll);

// Driver Routes
router
  .post("/supplier/driver/add", driver.add)
  .post("/supplier/driver/delete/:driverID/:supplierID", driver.delete)
  .get(
    "/supplier/driver/getDriversOfASupplier/:supplierID",
    driver.getDriversOfASupplier
  )
  .get("/driver/isAuthenticated", driver.isDriverAuthenticated)
  .get("/driver/getAllOrders/:driverID", driver.getAllOrders)
  .post("/driver/updateNotification", driver.updateNotifications)
  .post("/driver/login", driver.login);

// Order Routes
router
  .post("/user/order/add", order.add)
  .get(
    "/supplier/order/getOrdersOfASupplier/:supplierID",
    order.getOrdersOfASupplier
  )
  .post("/supplier/order/dispatch/:orderID/:supplierID", order.dispatch)
  .post(
    "/driver/order/markAsPicked/:driverID/:supplierID/:orderID",
    order.markAsPicked
  )
  .post(
    "/driver/order/markAsCompleted/:orderID/:supplierID",
    order.markAsCompleted
  )
  .post(
    "/driver/order/updateCurrentStatus/:orderID/:supplierID",
    order.updateCurrentStatus
  )
  .get("/order/getLiveUpdates/:supplierID", order.getLiveUpdates)
  .post("/order/triggerDriverSMS", order.triggerDriverSMS);

// Customer routes
router
  .post("/customer/create", customer.create)
  .post("/customer/login", customer.login)
  .post("/customer/addToCart/:customerID", customer.addItemToCart)
  .post("/customer/pullFromCart/:customerID", customer.pullItemFromCart)
  .get("/customer/isAuthenticated", customer.isCustomerAuthenticated)
  .post("/customer/getProductsFromCart", customer.getProductsFromCart)
  .get(
    "/customer/getOrdersOfCustomer/:customerID",
    customer.getOrdersOfCustomer
  )
  .post("/customer/addFeedback", customer.addFeedback);
module.exports = router;
