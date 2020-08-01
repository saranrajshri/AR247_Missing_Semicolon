import React, { useState, useContext } from "react";
import "./Signin.css";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button } from "semantic-ui-react";
import isEmpty from "../../../Utils/isEmpty";
import { FarmerContext } from "../../../Context/FarmerContext";
import { loginCustomer } from "../../../actions/actions";
import { useTranslation } from "react-i18next";
/**
 * Login screen for farmer.
 * @param {Props} props
 */
const Signin = (props) => {
  const history = useHistory();
  let location = useLocation();
  const { setFullScreenLoader, setFarmerData } = useContext(FarmerContext);
  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    phoneNumber: null,
    password: null
  });
  const { t } = useTranslation();
  let { from } = location.state || { from: { pathname: "/farmer/home" } };

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
          phoneNumber: t("phReq"),
          password: t("paReq")
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
      loginCustomer(credentials)
        .then((res) => {
          setFullScreenLoader(false);
          localStorage.setItem("CUSTOMER_AUTH_TOKEN", res.data.token);
          setFarmerData(res.data.user);
          history.replace(from);
        })
        .catch((err) => {
          setFullScreenLoader(false);
          handleErrors(
            setErrors({
              ...errors,
              phoneNumber: err.response.data.error.message,
              password: err.response.data.error.message
            })
          );
        });
    }
  };

  return (
    <div className="signin-container">
      <div className="wrapper">
        <div className="card signin-card">
          <div className="card-header signin-title">
            MR. JUTE <sub className="subtitle">{t("farmer")} </sub>
          </div>
          <div className="card-content">
            <Form className="signin-form">
              <Form.Field
                control={Input}
                label={t("phone")}
                name="phoneNumber"
                icon="phone"
                type="text"
                iconPosition="left"
                placeholder={t("enterPhone")}
                value={credentials.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />

              <Form.Field
                control={Input}
                label={t("pass")}
                name="password"
                icon="key"
                iconPosition="left"
                type="password"
                placeholder={t("enterPass")}
                value={credentials.password}
                onChange={handleChange}
                error={errors.password}
              />

              <Button
                className="button"
                fluid
                content={t("login")}
                color="blue"
                onClick={onLogin}
              />
            </Form>
            <div class="form-links">
              {/* eslint-disable-next-line */}
              <a href="/farmer/register" class="link-txt">
                {t("signUp")}
              </a>
              {/* eslint-disable-next-line */}
              <a href="#" class="link-txt">
                {t("forgotPass")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
