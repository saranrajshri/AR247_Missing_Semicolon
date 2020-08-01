import React, { useState, useContext } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button } from "semantic-ui-react";
import isEmpty from "../../../Utils/isEmpty";
import { DriverContext } from "../../../Context/DriverContext";
import { loginDriver } from "../../../actions/actions";
/**
 * Login screen for driver.
 */
const DriverLogin = () => {
  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    phoneNumber: null,
    password: null,
  });
  const { setFullScreenLoader, setDriverData } = useContext(DriverContext);
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/driver/home" } };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // set errors to empty after 3 seconds.
  const handleErrors = () => {
    setTimeout(
      () => setErrors({ ...errors, phoneNumber: null, password: null }),
      3000
    );
  };
  // Validate form and navigate to home.
  const onLogin = () => {
    if (isEmpty(credentials.phoneNumber) && isEmpty(credentials.password)) {
      handleErrors(
        setErrors({
          ...errors,
          phoneNumber: "Phone number is required.",
          password: "Password is required.",
        })
      );
      return;
    }
    if (isEmpty(credentials.phoneNumber)) {
      handleErrors(
        setErrors({ ...errors, phoneNumber: "Phone number is required." })
      );
    }
    if (isEmpty(credentials.password)) {
      handleErrors(setErrors({ ...errors, password: "Password is required." }));
    }
    if (!isEmpty(credentials.phoneNumber) && !isEmpty(credentials.password)) {
      setFullScreenLoader(true);
      loginDriver(credentials)
        .then((res) => {
          setFullScreenLoader(false);
          localStorage.setItem("DRIVER_AUTH_TOKEN", res.data.token);
          setDriverData(res.data.user);
          history.replace(from);
        })
        .catch((err) => {
          setFullScreenLoader(false);
          handleErrors(
            setErrors({
              ...errors,
              phoneNumber: err.response.data.error.message,
              password: err.response.data.error.message,
            })
          );
        });
    }
  };

  return (
    <div className="driver-signin-container">
      <div className="wrapper">
        <div className="card driver-signin-card">
          <div className="card-header driver-signin-title">
            MR. JUTE <sub className="subtitle"> DRIVER</sub>
          </div>
          <div className="card-content">
            <Form className="driver-signin-form">
              <Form.Field
                control={Input}
                label="Phone number"
                name="phoneNumber"
                icon="phone"
                type="text"
                iconPosition="left"
                placeholder="Enter your phone number"
                value={credentials.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />

              <Form.Field
                control={Input}
                label="Password"
                name="password"
                icon="key"
                iconPosition="left"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                error={errors.password}
              />

              <Button
                className="button"
                fluid
                content="LOGIN"
                color="blue"
                onClick={onLogin}
              />
            </Form>
            <div class="form-driverLogin">
              <a href="#" class="link-txt">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
