import React, { useState, useContext, useEffect } from "react";

import { Form, Button } from "semantic-ui-react";
import { Context } from "../../../../../Context/Context";
import isEmpty from "../../../../../Utils/isEmpty";
import { updateSupplierDetails } from "../../../../../actions/actions";

const Settings = () => {
  const { supplierData, setFullScreenLoader, setAlert } = useContext(Context);
  const [formData, setFormData] = useState(supplierData);
  const [wareHouseAddress, setWareHouseAddress] = useState("");
  const [errors, setErrors] = useState({
    supplierName: null,
    agencyName: null,
    phoneNumber: null,
    email: null,
    password: null,
    address: null
  });

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
          address: null
        }),
      3000
    );
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWareHouseAddressChange = e => {
    setWareHouseAddress(e.target.value);
  };

  const handleClear = () => {
    setFormData(supplierData);
    setWareHouseAddress(
      supplierData.wareHouse !== undefined
        ? supplierData.wareHouse.locationName
        : ""
    );
  };
  const handleSubmit = () => {
    if (
      isEmpty(formData.email) &&
      isEmpty(formData.supplierName) &&
      isEmpty(formData.agencyName) &&
      isEmpty(formData.phoneNumber) &&
      isEmpty(formData.address)
    ) {
      handleErrors(
        setErrors({
          ...errors,
          email: "Email is required.",
          supplierName: "Supplier name is required.",
          agencyName: "Agency name is required.",
          phoneNumber: "Phone number is required.",
          address: "Address is required."
        })
      );
      return;
    }
    if (isEmpty(formData.email)) {
      handleErrors(setErrors({ ...errors, email: "Email is required." }));
    }
    if (isEmpty(formData.password)) {
      handleErrors(setErrors({ ...errors, password: "Password is required." }));
    }
    if (isEmpty(formData.supplierName)) {
      handleErrors(
        setErrors({ ...errors, supplierName: "Supplier name is required." })
      );
    }
    if (isEmpty(formData.agencyName)) {
      handleErrors(
        setErrors({ ...errors, agency: "Agency name is required." })
      );
    }
    if (isEmpty(formData.phoneNumber)) {
      handleErrors(
        setErrors({ ...errors, phoneNumber: "Phone number is required." })
      );
    }
    if (isEmpty(formData.address)) {
      handleErrors(setErrors({ ...errors, address: "Address is required." }));
    }
    if (
      !isEmpty(formData.email) &&
      !isEmpty(formData.supplierName) &&
      !isEmpty(formData.agencyName) &&
      !isEmpty(formData.phoneNumber) &&
      !isEmpty(formData.address)
    ) {
      setFullScreenLoader(true);
      var dataToBeSent = formData;
      dataToBeSent.wareHouseAddress = wareHouseAddress;
      updateSupplierDetails(dataToBeSent, supplierData._id)
        .then(res => {
          setFullScreenLoader(false);
          setAlert({
            alertType: "positive",
            message: "Updated Successfully..!",
            isOpen: true
          });
        })
        .catch(err => {
          setFullScreenLoader(false);
          setAlert({
            alertType: "negative",
            message: err.response.data.error.message,
            isOpen: true
          });
        });
    }
  };

  useEffect(() => {
    setFormData(supplierData);
    setWareHouseAddress(
      supplierData.wareHouse !== undefined
        ? supplierData.wareHouse.locationName
        : ""
    );
  }, [supplierData]);

  return (
    <div>
      <div className="p-5">
        <p className="title text-dark">Manage Details</p>
        {/* Row */}
        <div className="card">
          <div className="card-content">
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Supplier Name"
                  name="supplierName"
                  onChange={handleChange}
                  value={formData.supplierName}
                  placeholder="Supplier Name"
                  error={errors.supplierName}
                  readOnly
                />
                <Form.Input
                  fluid
                  name="agencyName"
                  onChange={handleChange}
                  label="Agency name"
                  value={formData.agencyName}
                  placeholder="Agency Name"
                  readOnly
                  error={errors.agencyName}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  name="phoneNumber"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  error={errors.phoneNumber}
                  label="Phone Number"
                  placeholder="Phone Number"
                />
                <Form.Input
                  fluid
                  name="faxNumber"
                  onChange={handleChange}
                  error={errors.faxNumber}
                  label="Fax Number"
                  value={formData.faxNumber}
                  placeholder="Fax Number"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  name="email"
                  value={formData.email}
                  errors={errors.email}
                  onChange={handleChange}
                  required
                  fluid
                  label="Email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.TextArea
                  label="Office Address"
                  required
                  errors={errors.address}
                  value={formData.address}
                  onChange={handleChange}
                  name="address"
                  placeholder="Office Address"
                />
                <Form.TextArea
                  label="Ware House Address"
                  required
                  onChange={handleWareHouseAddressChange}
                  name="wareHouseAddress"
                  value={wareHouseAddress}
                  placeholder="Ware House Address"
                />
              </Form.Group>
              <Button onClick={handleClear}>Clear</Button>
              <Button primary onClick={handleSubmit}>
                Save Changes
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
