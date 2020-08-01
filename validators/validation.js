const Joi = require("@hapi/joi");

// Supplier Register validation
const supplierSchema = Joi.object({
  supplierName: Joi.string().required(),
  agencyName: Joi.string().required(),
  phoneNumber: Joi.string()
    .length(10)
    .required(),
  faxNumber: Joi.string(),
  address: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

// supplier login validation
const supplierAuth = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});

// customer register validation
const customerSchema = Joi.object({
  customerName: Joi.string().required(),
  phoneNumber: Joi.string()
    .length(10)
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

// customter login
const customerAuth = Joi.object({
  phoneNumber: Joi.string()
    .length(10)
    .required(),
  password: Joi.string().required()
});

module.exports = {
  supplierSchema,
  supplierAuth,
  customerSchema,
  customerAuth
};
