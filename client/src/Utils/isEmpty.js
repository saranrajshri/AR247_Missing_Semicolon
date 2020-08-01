/**
 * Checks if value is null or undefined.
 * Checks if object is empty
 * Checks if array is empty
 * Checks if string is empty.
 * @param {*} value
 */
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (Array.isArray(value) && value.length === 0);

export default isEmpty;
