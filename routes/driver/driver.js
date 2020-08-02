const Driver = require("../../models/DriversSchema");
const Order = require("../../models/OrdersSchema");
const Notifications = require("../../models/NotificationsSchema");
const createError = require("http-errors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
let driver = (module.exports = {});
const supplier = require("../supplier/supplier");

const config = require("../../config/database.json")[
  process.env.NODE_ENV || "development"
];

// Utility function for hashing password
const hash = (input, salt) => {
  var hashedString = crypto.pbkdf2Sync(input, salt, 10000, 512, "sha512");
  return ["pbkdf2S", "10000", salt, hashedString.toString("hex")].join("$");
};

const fetchDriversOfASupplier = (req, supplierID) => {
  var client = req.app.get("client");
  Driver.find({ supplierID: supplierID }, { password: 0 })
    .then(response => {
      client.emit("drivers", response);
    })
    .catch(() => {
      client.emit("drivers", []);
    });
};

// add a new driver
driver.add = (req, res) => {
  var driverData = req.body;
  // find the number of documents in the collection
  Driver.count({}).then(count => {
    //   Add to DB
    driverData.driverID = "DR-" + parseInt(count + 1);
    const salt = crypto.randomBytes(128).toString("hex");
    const hashedPassword = hash(driverData.password, salt);
    driverData.password = hashedPassword;

    var driver = new Driver(driverData);
    driver
      .save()
      .then(response => {
        fetchDriversOfASupplier(req, req.body.supplierID); // emit through socket
        res.status(200).send(response);
      })
      .catch(() => {
        res.status(400).send({ message: "Failed to add driver" });
      });
  });
};

// delete a driver
driver.delete = (req, res) => {
  Driver.findOneAndRemove({ _id: req.params.driverID })
    .then(() => {
      fetchDriversOfASupplier(req, req.params.supplierID); //emit through socket
      res.status(200).send({ message: "Deleted Successfully" });
    })
    .catch(() => {
      res.status(400).send({ message: "Failed to delete driver" });
    });
};

// get all products of a supplier
driver.getDriversOfASupplier = (req, res) => {
  fetchDriversOfASupplier(req, req.params.supplierID);
};

// get all orders of the driver
driver.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ driverID: req.params.driverID });
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

// Driver login
driver.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const driver = await Driver.findOne({ primaryContact: phoneNumber });
    if (driver) {
      const actualPassword = driver.password;
      const salt = actualPassword.split("$")[2];
      var hashedPassword = hash(password, salt);
      if (actualPassword === hashedPassword) {
        var token = jwt.sign(
          {
            id: driver._id
          },
          config.secret,
          {
            expiresIn: 2628003 // expires in one month
          }
        );

        const driverData = await Driver.findOne({ _id: driver._id });
        driverData.password = undefined;
        res.send({ auth: true, token: token, user: driverData });
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

driver.isDriverAuthenticated = (req, res, next) => {
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

      const driverData = await Driver.findOne(
        { _id: decoded.id },
        { password: 0 }
      );

      res.send(driverData);
    });
  } catch (err) {
    next(err);
  }
};

// update notifications to supplier
driver.updateNotifications = async (req, res, next) => {
  try {
    const { message, title, supplierID } = req.body;
    const data = {
      message,
      title,
      supplierID,
      timeStamp: new Date()
    };
    const newNotification = new Notifications(data);
    const saved = await newNotification.save();
    supplier.getNotifications(req, res, next);
    res.send(saved);
  } catch (err) {
    next(err);
  }
};
