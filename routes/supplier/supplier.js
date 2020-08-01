const Supplier = require("../../models/SupplierSchema");
const VerifiedSupplier = require("../../models/VerifiedSupplierSchema");

const crypto = require("crypto");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// Validators
const { supplierSchema, supplierAuth } = require("../../validators/validation");

const config = require("../../config/database.json")[
  process.env.NODE_ENV || "development"
];

let supplier = (module.exports = {});

// Utility function for hashing password
const hash = (input, salt) => {
  var hashedString = crypto.pbkdf2Sync(input, salt, 10000, 512, "sha512");
  return ["pbkdf2S", "10000", salt, hashedString.toString("hex")].join("$");
};

/**
 * Get The Latitude and Longitude For a place name
 * @param {String} placeName
 * @returns {Object} result
 */
const geoCoder = async placeName => {
  placeName = placeName.replace(" ", "%20");
  const res = await axios.get(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=${placeName}&gen=9&apiKey=${config.HERE_MAPS_API_KEY}`
  );

  var coordinates = await res.data.Response.View[0].Result[0].Location
    .DisplayPosition;
  var result = {
    status: true,
    data: {
      lat: coordinates.Latitude,
      lon: coordinates.Longitude
    }
  };
  return result;
};
// add  a new supplier
supplier.create = async (req, res, next) => {
  try {
    const { email, password, agencyName, phoneNumber } = req.body;

    const result = await supplierSchema.validateAsync(req.body);

    const supplierDoesExist = await Supplier.find({ email: email });
    const isVerifiedSupplier = await VerifiedSupplier.find({
      agencyName: agencyName,
      phoneNumber: phoneNumber
    });

    if (isVerifiedSupplier.length === 0) {
      throw createError.Conflict("Not a verifed Supplier");
    }

    if (supplierDoesExist.length > 0) {
      throw createError.Conflict("Supplier has already registered");
    }

    // Encrypt the password
    const salt = crypto.randomBytes(128).toString("hex");
    const hashedPassword = hash(password, salt);

    req.body.password = hashedPassword;

    const supplier = new Supplier(req.body);
    var savedSupplier = await supplier.save();
    savedSupplier.password = undefined;

    // Create token for the session
    var token = jwt.sign(
      {
        id: savedSupplier._id
      },
      config.secret,
      {
        expiresIn: 2628003 // expires in one month
      }
    );

    res.send({ auth: true, token: token, user: savedSupplier });
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};

// supplier login
supplier.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validate = supplierAuth.validateAsync(req.body);

    const supplier = await Supplier.findOne({ email: email });
    if (supplier) {
      const actualPassword = supplier.password;
      var salt = actualPassword.split("$")[2];
      var hashedPassword = hash(password, salt);
      if (actualPassword === hashedPassword) {
        var token = jwt.sign(
          {
            id: supplier._id
          },
          config.secret,
          {
            expiresIn: 2628003 // expires in one month
          }
        );
        supplier.password = undefined;
        res.send({ auth: true, token: token, user: supplier });
      } else {
        throw createError.Unauthorized("Incorrect Email / Password");
      }
    } else {
      throw createError.Unauthorized("Supplier Doesn't exists");
    }
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};

supplier.isSupplierAuthenticated = (req, res, next) => {
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

      const supplierData = await Supplier.findOne(
        { _id: decoded.id },
        { password: 0 }
      );

      res.send(supplierData);
    });
  } catch (err) {
    next(err);
  }
};

supplier.getMappings = async (req, res, next) => {
  var result = {};
  await Supplier.find({}).then(suppliers => {
    suppliers.map(supplier => {
      result[supplier._id] = supplier.agencyName;
    });
  });
  res.send(result);
};

supplier.update = async (req, res, next) => {
  try {
    const {
      supplierName,
      agencyName,
      email,
      phoneNumber,
      faxNumber,
      address,
      wareHouseAddress
    } = req.body.supplierData;

    const wareHouseCoordinates = await geoCoder(wareHouseAddress);
    var wareHouse = {};
    wareHouse.locationName = wareHouseAddress;
    wareHouse.coordinates = wareHouseCoordinates.data;
    const updatedSupplier = await Supplier.findOneAndUpdate(
      {
        _id: req.params.supplierID
      },
      {
        supplierName: supplierName,
        agencyName: agencyName,
        faxNumber: faxNumber,
        address: address,
        wareHouse: wareHouse,
        phoneNumber: phoneNumber,
        email: email
      }
    );
    updatedSupplier.password = undefined;
    res.send(updatedSupplier);
  } catch (err) {
    next(err);
  }
};
