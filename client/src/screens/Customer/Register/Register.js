import React, { useState, useContext } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, TextArea } from "semantic-ui-react";
import { FarmerContext } from "../../../Context/FarmerContext";
import { registerCustomer } from "../../../actions/actions";
import { useTranslation } from "react-i18next";
import { validateCustomerSignup } from "../../../Utils/Validation";
/**
 * Register screen for farmer.
 */
const Register = () => {
  const { setFullScreenLoader, setFarmerData } = useContext(FarmerContext);
  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    password: "",
    customerName: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    phoneNumber: null,
    password: null,
    customerName: null,
    address: null,
  });
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // set errors to empty after 3 seconds.
  const handleErrors = () => {
    setTimeout(
      () =>
        setErrors({
          ...errors,
          phoneNumber: null,
          password: null,
          customerName: null,
          address: null,
        }),
      3000
    );
  };

  // Register the user.
  const onRegister = () => {
    // Validates the field inputs.
    const { validationErrors, isValid } = validateCustomerSignup(credentials);
    setFullScreenLoader(true);
    if (isValid) {
      let { phoneNumber, customerName, password } = credentials;
      registerCustomer({
        phoneNumber: phoneNumber,
        customerName: customerName,
        password: password,
      })
        .then((res) => {
          setFullScreenLoader(false);
          localStorage.setItem("CUSTOMER_AUTH_TOKEN", res.data.token);
          setFarmerData(res.data.user);
          history.push("/farmer/home");
        })
        .catch((err) => {
          setFullScreenLoader(false);
          handleErrors(
            setErrors({
              ...errors,
              customerName: err.response.data.error.message,
            })
          );
        });
    } else {
      handleErrors(setErrors({ ...errors, ...validationErrors }));
    }
  };

  const { t, i18n } = useTranslation();
  let [locale, setLocale] = useState("en");
  const handleLocaleChange = (lang) => {
    setLocale(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="register-container">
      <div className="wrapper">
        <select
          value={locale}
          onChange={(e) => handleLocaleChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hin">हिन्दी</option>
        </select>
        <div className="card register-card">
          <div className="card-header register-title">
            MR. JUTE <sub className="subtitle"> {t("farmer")}</sub>
          </div>
          <div className="card-content">
            <Form className="register-form">
              <Form.Field
                control={Input}
                label={t("fullName")}
                name="customerName"
                required
                type="text"
                placeholder={t("enterFName")}
                value={credentials.customerName}
                onChange={handleChange}
                error={errors.customerName}
              />
              <Form.Field
                control={Input}
                label={t("phone")}
                name="phoneNumber"
                required
                type="text"
                placeholder={t("enterPhone")}
                value={credentials.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />

              <Form.Field
                control={Input}
                label={t("pass")}
                required
                name="password"
                type="password"
                placeholder={t("enterPass")}
                value={credentials.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Form.Field
                control={TextArea}
                label={t("addr")}
                required
                name="address"
                type="text"
                placeholder={t("enterAddr")}
                value={credentials.address}
                onChange={handleChange}
                error={errors.address}
              />

              <Button
                className="button"
                fluid
                content={t("register")}
                color="blue"
                onClick={onRegister}
              />
            </Form>
            <div className="form-login">
              <a href="/farmer/login" class="login-link">
                {t("already")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
