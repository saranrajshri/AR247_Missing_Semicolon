import isEmpty from "../isEmpty";

// Validates the supplier signup form fields.
const validateSupplierSignup = (data) => {
  let email = !isEmpty(data.email) ? data.email : "";
  let phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  let password = !isEmpty(data.password) ? data.password : "";
  let supplierName = !isEmpty(data.supplierName) ? data.supplierName : "";
  let agencyName = !isEmpty(data.agencyName) ? data.agencyName : "";
  let address = !isEmpty(data.address) ? data.address : "";

  let validationErrors = {};

  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    validationErrors.email = "Enter a valid email address.";
  }
  if (email.length === 0) {
    validationErrors.email = "Eamil is required.";
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
  if (supplierName.length === 0) {
    validationErrors.supplierName = "Supplier name is required.";
  }
  if (agencyName.length === 0) {
    validationErrors.agencyName = "Agency name is required.";
  }
  if (address.length === 0) {
    validationErrors.address = "Address is required.";
  }

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  };
};

export default validateSupplierSignup;
