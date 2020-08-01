const Customer = require("../../models/CustomerSchema");
const Product = require("../../models/ProductsSchema");
const FeedBack = require("../../models/FeedbackSchema");
const createError = require("http-errors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const config = require("../../config/database.json")[
  process.env.NODE_ENV || "development"
];

// Validators
const { customerSchema, customerAuth } = require("../../validators/validation");

let customer = (module.exports = {});

// Utility function for hashing password
const hash = (input, salt) => {
  var hashedString = crypto.pbkdf2Sync(input, salt, 10000, 512, "sha512");
  return ["pbkdf2S", "10000", salt, hashedString.toString("hex")].join("$");
};

// Add a new customer
customer.create = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const validate = await customerSchema.validateAsync(req.body);

    const doesUserExists = await Customer.find({ phoneNumber: phoneNumber });

    if (doesUserExists.length > 0) {
      throw createError.Conflict("User already Exists");
    }

    // Encrypt the password
    const salt = crypto.randomBytes(128).toString("hex");
    const hashedPassword = hash(password, salt);

    req.body.password = hashedPassword;

    const customer = new Customer(req.body);
    var savedCustomer = await customer.save();
    savedCustomer.password = undefined;

    // Create token for the session
    var token = jwt.sign(
      {
        id: savedCustomer._id
      },
      config.secret,
      {
        expiresIn: 2628003 // expires in one month
      }
    );

    res.send({ auth: true, token: token, user: savedCustomer });
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};

// supplier login
customer.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const validate = await customerAuth.validateAsync(req.body);

    const customer = await Customer.findOne({ phoneNumber: phoneNumber });
    if (customer) {
      const actualPassword = customer.password;
      const salt = actualPassword.split("$")[2];
      var hashedPassword = hash(password, salt);
      if (actualPassword === hashedPassword) {
        var token = jwt.sign(
          {
            id: customer._id
          },
          config.secret,
          {
            expiresIn: 2628003 // expires in one month
          }
        );

        const customerData = await Customer.findOne({ _id: customer._id });
        customerData.password = undefined;
        res.send({ auth: true, token: token, user: customerData });
      } else {
        throw createError.Unauthorized("Incorrect Email / Password");
      }
    } else {
      throw createError.Unauthorized("Incorrect Email / Password");
    }
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};

// add a item to customer cart
customer.addItemToCart = async (req, res, next) => {
  try {
    var item = req.body;
    const customerData = await Customer.findOneAndUpdate(
      { _id: req.params.customerID },
      { $addToSet: { cart: item } }
    );

    const updatedCustomerData = await Customer.findOne({
      _id: req.params.customerID
    });
    res.send(updatedCustomerData);
  } catch (err) {
    next(err);
  }
};

// remove an item from customer cart
customer.pullItemFromCart = async (req, res, next) => {
  try {
    var item = req.body;
    const customerData = await Customer.findOneAndUpdate(
      { _id: req.params.customerID },
      { $pull: { cart: item } }
    );

    const updatedCustomerData = await Customer.findOne({
      _id: req.params.customerID
    });
    res.send(updatedCustomerData);
  } catch (err) {
    next(err);
  }
};

//get the details of the product in the customer cart
customer.getProductsFromCart = async (req, res, next) => {
  const productsIDArray = req.body.products;
  try {
    const products = await Product.find({ barCode: { $in: productsIDArray } });
    res.send(products);
  } catch (err) {
    next(err);
  }
};

customer.isCustomerAuthenticated = (req, res, next) => {
  try {
    var token = req.headers["authorization"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      // if everything good, save to request for use in other routes
      req.userId = decoded.id;

      const customerData = await Customer.findOne(
        { _id: decoded.id },
        { password: 0 }
      );

      res.send(customerData);
    });
  } catch (err) {
    next(err);
  }
};

// get the orders of the customer
customer.getOrdersOfCustomer = async (req, res, next) => {
  try {
    const orders = await Customer.find({ _id: req.params.customerID });
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

// add feedback
customer.addFeedback = async (req, res, next) => {
  try {
    const feedback = new FeedBack(req.body);
    const savedFeedback = await feedback.save();
    res.send(savedFeedback);
  } catch (err) {
    next(err);
  }
};
