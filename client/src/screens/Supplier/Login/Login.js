import React, { useState, useContext } from "react";
import "./Login.css";
//import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "semantic-ui-react";
import isEmpty from "../../../Utils/isEmpty";
import { supplierLogin } from "../../../actions/actions";
import { Context } from "../../../Context/Context";
/**
 * Login screen for supplier.
 */
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const { setSupplierData, setFullScreenLoader } = useContext(Context);
  //const history = useHistory();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // set errors to empty after 3 seconds.
  const handleErrors = () => {
    setTimeout(
      () => setErrors({ ...errors, email: null, password: null }),
      3000
    );
  };
  // Validate form and navigate to home.
  const onLogin = () => {
    if (isEmpty(credentials.email) && isEmpty(credentials.password)) {
      handleErrors(
        setErrors({
          ...errors,
          email: "Email is required.",
          password: "Password is required.",
        })
      );
      return;
    }
    if (isEmpty(credentials.email)) {
      handleErrors(setErrors({ ...errors, email: "Email is required." }));
    }
    if (isEmpty(credentials.password)) {
      handleErrors(setErrors({ ...errors, password: "Password is required." }));
    }
    if (!isEmpty(credentials.email) && !isEmpty(credentials.password)) {
      // login action
      setFullScreenLoader(true);
      supplierLogin(credentials)
        .then((res) => {
          setFullScreenLoader(false);
          localStorage.setItem("supplierAuthToken", res.data.token);
          setSupplierData(res.data.user);
          window.location = "/supplier/home";
          // props.history.push("/supplier/home");
        })
        .catch((err) => {
          setFullScreenLoader(false);
          handleErrors(
            setErrors({
              ...errors,
              email: err.response.data.error.message,
            })
          );
        });
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="card login-card">
          <div className="card-header login-title">
            MR. JUTE <sub className="subtitle"> SUPPLIER</sub>
          </div>
          <div className="card-content">
            <Form className="login-form">
              <Form.Field
                control={Input}
                label="E-mail"
                name="email"
                icon="at"
                type="email"
                iconPosition="left"
                placeholder="Enter your E-mail"
                value={credentials.email}
                onChange={handleChange}
                error={errors.email}
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
            <div class="form-links">
              {/* eslint-disable-next-line */}
              <a href="/supplier/signup" class="link-txt">
                Sign Up
              </a>
              {/* eslint-disable-next-line */}
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

export default Login;
