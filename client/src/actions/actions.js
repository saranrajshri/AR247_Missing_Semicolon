import axios from "axios";
import constants from "../Constants/constants";
// Header with Auth tokens.
const supplierHeaders = {
  Authorization: localStorage.getItem("supplierAuthToken")
};
const customerHeaders = {
  Authorization: localStorage.getItem("CUSTOMER_AUTH_TOKEN")
};
const driverHeaders = {
  Authorization: localStorage.getItem("DRIVER_AUTH_TOKEN")
};

// Actions for API call to endpoints.

// ----------Supplier Actions---------- //
/**
 *
 * @param {Object} regiterData
 * @returns {Object} Response Object
 */
export const supplierRegister = (regiterData) => {
  var res = axios.post(`${constants.BASE_URL}/supplier/create`, regiterData);
  return res;
};

/**
 *
 * @param {Object} loginData
 * @returns {Object} Response Object
 */
export const supplierLogin = (loginData) => {
  var res = axios.post(`${constants.BASE_URL}/supplier/login`, loginData);
  return res;
};

/**
 * @returns {Object} Response Object
 */
export const isSupplierAuthenticated = () => {
  var res = axios.get(`${constants.BASE_URL}/supplier/isAuthenticated`, {
    headers: supplierHeaders
  });
  return res;
};

/**
 * @param {Object} supplierData
 * @param {String} supplierID
 * @requires {Object} Response Object
 */

export const updateSupplierDetails = (supplierData, supplierID) => {
  var res = axios.post(`${constants.BASE_URL}/supplier/update/${supplierID}`, {
    supplierData
  });
  return res;
};

/**
 * @requires {Object} Response Object
 */
export const getSupplierMappings = () => {
  var res = axios.get(`${constants.BASE_URL}/supplier/getMappings`);
  return res;
};

// Product actions

/**
 * Add a new product to the collection
 * @param {Object} productData
 * @returns {Object} Response object
 */
export const addProduct = (productData) => {
  var res = axios.post(
    `${constants.BASE_URL}/supplier/product/add`,
    productData
  );
  return res;
};

/**
 * Update a product details
 * @param {Object} productData
 * @returns {Object} Response object
 */
export const updateProduct = (barCode, productData) => {
  var res = axios.post(
    `${constants.BASE_URL}/supplier/product/update/${barCode}`,
    productData
  );
  return res;
};

/**
 * Delete a product from the collection
 * @param {String} productBarCode
 * @param {String} supplierID
 * @returns {Object} res
 */
export const deleteProduct = (productBarCode, supplierID) => {
  var res = axios.post(
    `${constants.BASE_URL}/supplier/product/delete/${productBarCode}/${supplierID}`
  );
  return res;
};

/**
 * Get all products of the specified supplier
 * @param {String} supplierID
 * @returns {Array} List of product objects
 */
export const getProductsOfASupplier = (supplierID) => {
  var res = axios.get(
    `${constants.BASE_URL}/supplier/product/getProductsOfASupplier/${supplierID}`
  );
  return res;
};

// Driver actions

/**
 * Adds a driver for supplier
 * @param {Object} driverData
 * @returns {Object} Response object
 */
export const addDriver = (driverData) => {
  var res = axios.post(`${constants.BASE_URL}/supplier/driver/add`, driverData);
  return res;
};

/**
 * Delete a driver from a supplier
 * @param {String} driverID
 * @param {String} supplierID
 * @returns {Object} Response object
 */
export const deleteDriver = (driverID, supplierID) => {
  var res = axios.post(
    `${constants.BASE_URL}/supplier/driver/delete/${driverID}/${supplierID}`
  );
  return res;
};

/**
 * Get the list of drivers under the specified supplier
 * @param {String} supplierID
 * @returns {Array} List of driver objects
 */
export const getDriversOfASupplier = (supplierID) => {
  var res = axios.get(
    `${constants.BASE_URL}/supplier/driver/getDriversOfASupplier/${supplierID}`
  );
  return res;
};
