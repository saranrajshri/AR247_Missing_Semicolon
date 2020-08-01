import isEmpty from "../isEmpty";

// Validates the customer signup form fields.
const validateCustomerSignup = (data) => {
  let customerName = !isEmpty(data.customerName) ? data.customerName : "";
  let phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  let password = !isEmpty(data.password) ? data.password : "";

  let validationErrors = {};

  if (customerName.length < 3 || customerName.length > 20) {
    validationErrors.customerName = "Name must be between 3 to 20 characters.";
  }
  if (!/^[ A-Za-z]+$/.test(customerName)) {
    validationErrors.customerName = "Name must be only alphabets";
  }
  if (customerName.length === 0) {
    validationErrors.customerName = "Name is required.";
  }
  if (phoneNumber.length !== 10) {
    validationErrors.phoneNumber = "Enter a valid phone number.";
  }
  if (!/^\d+$/.test(phoneNumber)) {
    validationErrors.phoneNumber = "Enter only numbers.";
  }
  if (phoneNumber.length === 0) {
    validationErrors.phoneNumber = "Phone number is required.";
  }
  if (password.length < 6) {
    validationErrors.password = "Password must be minimum of 6 character";
  }
  if (password.length === 0) {
    validationErrors.password = "Password is required";
  }

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  };
};

export default validateCustomerSignup;
