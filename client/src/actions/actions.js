import axios from "axios";
import constants from "../Constants/constants";
const supplierHeaders = {
  Authorization: localStorage.getItem("supplierAuthToken")
};
const customerHeaders = {
  Authorization: localStorage.getItem("CUSTOMER_AUTH_TOKEN")
};
const driverHeaders = {
  Authorization: localStorage.getItem("DRIVER_AUTH_TOKEN")
};
// Actions for accessing route endpoints

// ----------Supplier Actions---------- //
/**
 * Get live updates of overall orders of the supplier
 * @param {String} supplierID
 * @returns {Object} Response Object
 */

export const getLiveUpdates = (supplierID) => {
  var res = axios.get(
    `${constants.BASE_URL}/order/getLiveUpdates/${supplierID}`
  );
  return res;
};
export const addCertifiedSeeds = (cdata) => {
  var res = axios.post(
    `${constants.BASE_URL}/supplier/addCertifiedSeeds`,
    cdata
  );
  return res;
};

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
 * @requires {Object} Response Object
 */
export const getSupplierMappings = () => {
  var res = axios.get(`${constants.BASE_URL}/supplier/getMappings`);
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

/**
 * Get all certified seeds of the specified supplier
 * @param {String} supplierID
 * @returns {Array} List of product objects
 */
export const getInventory = (supplierID) => {
  var res = axios.get(
    `${constants.BASE_URL}/supplier/getCertifiedSeedsOfSupplier/${supplierID}`
  );
  return res;
};
// Driver actions

/**
 * Update the current status of the order
 * @param {String} supplierID
 * @param {String} orderID
 * @returns {Object} Response Object
 */
export const updateCurrentStatusOfOrder = (supplierID, orderID, data) => {
  var res = axios.post(
    `${constants.BASE_URL}/driver/order/updateCurrentStatus/${orderID}/${supplierID}`,
    data
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
 * Adds a driver for supplier
 * @param {Object} driverData
 * @returns {Object} Response object
 */
export const addDriver = (driverData) => {
  var res = axios.post(`${constants.BASE_URL}/supplier/driver/add`, driverData);
  return res;
};

/**
 * Get the orders of the specified driver
 * @param {String} driverID
 */
export const getOrdersOfDriver = (driverID) => {
  var res = axios.get(`${constants.BASE_URL}/driver/getAllOrders/${driverID}`);
  return res;
};

/**
 * Update a order as pickedup
 * @param {String} orderID
 * @param {String} supplierID
 * @returns {Object} Response Object
 */

export const markAsPicked = (driverID, supplierID, orderID) => {
  var res = axios.post(
    `${constants.BASE_URL}/driver/order/markAsPicked/${driverID}/${supplierID}/${orderID}`
  );
  return res;
};

/**
 * Update a order as delivered
 * @param {String} orderID
 * @param {String} supplierID
 * @returns {Object} Response Object
 */

export const markAsDelivered = (orderID, supplierID) => {
  var res = axios.post(
    `${constants.BASE_URL}/driver/order/markAsCompleted/${orderID}/${supplierID}`
  );
  return res;
};

// Order Actions
/**
 * Get all the orders of the supplier
 * @param {String} supplierID
 * @returns {null} No response
 */
export const getOrdersOfASupplier = (supplierID) => {
  var res = axios.get(
    `${constants.BASE_URL}/supplier/order/getOrdersOfASupplier/${supplierID}`
  );
  return res;
};

export const getNotificationsOfASupplier = (supplierID) => {
  var res = axios.post(`${constants.BASE_URL}/supplier/getNotification`, {
    supplierID
  });
  return res;
};

/**
 * Dispatch a order
 * @param {String} orderID
 * @param {Object} orderData
 * @returns {Object} Response Object
 */
export const dispatchOrder = (orderID, orderData, supplierID) => {
  var res = axios.post(
    `${constants.BASE_URL}/supplier/order/dispatch/${orderID}/${supplierID}`,
    orderData
  );
  return res;
};

// ----------Customer Actions---------- //
/**
 * Register a new customer.
 * @param {Object} customerData - Customer details for registration.
 * @returns {Response} - Response object
 */
export const registerCustomer = (customerData) => {
  var res = axios.post(`${constants.BASE_URL}/customer/create`, customerData);
  return res;
};

/**
 * Login a customer.
 * @param {Object} credentials - Customer's login credentials.
 * @returns {Response} - Response object
 */
export const loginCustomer = (credentials) => {
  var res = axios.post(`${constants.BASE_URL}/customer/login`, credentials);
  return res;
};

/**
 * Check cutomer authentication and get customer data.
 * @returns {Response} - Response object with customer data
 */
export const checkCustomerAuthentication = () => {
  var res = axios.get(`${constants.BASE_URL}/customer/isAuthenticated`, {
    headers: customerHeaders
  });
  return res;
};

/**
 * Get all products objects
 * @param {null}
 * @returns {Response} - Response object
 */
export const getAllProducts = () => {
  var res = axios.get(`${constants.BASE_URL}/customer/product/getAll`);
  return res;
};

/**
 * Adds a product to cart.
 * @param {String} customerID - Customer's id
 * @param {Object} productID - Object with product id
 * @returns {Object} - User object with cart elements
 */
export const addItemToCart = (customerID, productID) => {
  var res = axios.post(
    `${constants.BASE_URL}/customer/addToCart/${customerID}`,
    productID
  );
  return res;
};

/**
 * Removes a product from cart.
 * @param {String} customerID - Customer's id
 * @param {Object} productID - Object with product id
 * @returns {Object} - User object with cart elements
 */
export const removeItemFromCart = (customerID, productID) => {
  var res = axios.post(
    `${constants.BASE_URL}/customer/pullFromCart/${customerID}`,
    productID
  );
  return res;
};

/**
 * Gets details of products in cart.
 * @param {Object} productsID - Object with products id in array.
 * @returns {Array.<Object>} - Array with product details object
 */
export const getProductsInCart = (productsID) => {
  var res = axios.post(
    `${constants.BASE_URL}/customer/getProductsFromCart`,
    productsID
  );
  return res;
};

/**
 * Place order for a customer.
 * @param {Object} orderData - Object with order details.
 * @returns {Object} - Object with order receipt and details.
 */
export const placeOrder = (orderData) => {
  var res = axios.post(`${constants.BASE_URL}/user/order/add`, orderData);
  return res;
};

// ---------- Driver actions ---------- //
export const triggerDriverSMS = () => {
  var res = axios.post(`${constants.BASE_URL}/order/triggerDriverSMS`, {});
  return res;
};
export const updateNotification = (data) => {
  var res = axios.post(`${constants.BASE_URL}/driver/updateNotification`, data);
  return res;
};

/**
 * Login for driver.
 * @param {Object} credentials - Driver credentials for login.
 * @return {Object} - Driver data object.
 */
export const loginDriver = (credentials) => {
  var res = axios.post(`${constants.BASE_URL}/driver/login`, credentials);
  return res;
};

/**
 * Check driver authentication and get driver data.
 * @returns {Response} - Response object with driver data
 */
export const checkDriverAuthentication = () => {
  var res = axios.get(`${constants.BASE_URL}/driver/isAuthenticated`, {
    headers: driverHeaders
  });
  return res;
};
