import React, { useState, useContext } from "react";
import "./Signup.css";
import { Form, Input, Button, TextArea } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { supplierRegister } from "../../../actions/actions";
import { Context } from "../../../Context/Context";
import { validateSupplierSignup } from "../../../Utils/Validation";
/**
 * Signup screen for supplier.
 */
const Signup = () => {
  const { setFullScreenLoader, setSupplierData } = useContext(Context);
  const [credentials, setCredentials] = useState({
    supplierName: "",
    agencyName: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    supplierName: null,
    agencyName: null,
    phoneNumber: null,
    email: null,
    password: null,
    address: null,
  });
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleErrors = () => {
    setTimeout(
      () =>
        setErrors({
          ...errors,
          supplierName: null,
          agencyName: null,
          phoneNumber: null,
          email: null,
          password: null,
          address: null,
        }),
      3000
    );
  };
  // Register the supplier.
  const onSubmit = () => {
    // Validates the supplier form fields.
    const { validationErrors, isValid } = validateSupplierSignup(credentials);
    setFullScreenLoader(true);
    if (isValid) {
      setFullScreenLoader(true);
      supplierRegister(credentials)
        .then((res) => {
          setFullScreenLoader(false);
          localStorage.setItem("supplierAuthToken", res.data.token);
          setSupplierData(res.data.user);
          history.push("/supplier/home");
        })
        .catch((err) => {
          setFullScreenLoader(false);
          handleErrors(
            setErrors({
              ...errors,
              supplierName: err.response.data.error.message,
            })
          );
        });
    } else {
      handleErrors(setErrors({ ...errors, ...validationErrors }));
    }
  };

  return (
    <div className="signup-container">
      <div className="wrapper">
        <div className="card signup-card">
          <div className="card-header signup-title">
            MR. JUTE <sub className="subtitle"> SUPPLIER</sub>
          </div>
          <div className="card-content">
            <Form className="signup-form">
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="Supplier Name"
                  required
                  name="supplierName"
                  type="text"
                  placeholder="Enter your name"
                  value={credentials.supplierName}
                  onChange={handleChange}
                  error={errors.supplierName}
                />

                <Form.Field
                  control={Input}
                  label="Agency name"
                  name="agencyName"
                  required
                  type="text"
                  placeholder="Enter your agency name"
                  value={credentials.agencyName}
                  onChange={handleChange}
                  error={errors.agencyName}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="Phone number"
                  required
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  value={credentials.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                />

                <Form.Field
                  control={Input}
                  label="Fax number"
                  name="faxNumber"
                  type="text"
                  placeholder="Enter your fax number"
                />
              </Form.Group>
              <Form.Field
                control={Input}
                label="E-mail"
                name="email"
                required
                type="email"
                placeholder="Enter your E-mail"
                value={credentials.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Form.Field
                control={Input}
                label="Password"
                name="password"
                required
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Form.Field
                control={TextArea}
                label="Address"
                name="address"
                required
                type="text"
                placeholder="Enter your address"
                value={credentials.address}
                onChange={handleChange}
                error={errors.address}
              />
              <Button
                className="button"
                fluid
                content="SUBMIT"
                color="blue"
                onClick={onSubmit}
              />
            </Form>
            <div class="form-login">
              <a href="/supplier/login" class="signin-link">
                Already have an account? Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
