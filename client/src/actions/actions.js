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
