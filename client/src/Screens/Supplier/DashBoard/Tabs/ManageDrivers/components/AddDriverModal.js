import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Form,
  Input,
  TextArea,
  Dropdown,
  Message
} from "semantic-ui-react";
/**
 * Display add driver modal.
 * @component
 * @param {Props} props
 */
const AddDriverModal = props => {
  const defaultDriver = {
    driverName: "",
    vehicleType: "",
    password: "",
    vehicleNumber: "",
    primaryContact: "",
    secondaryContact: "",
    driverAddress: "",
    supplierID: props.data._id,
    isAvailable: true
  };
  const { visible, handleClose, handleDone } = props;
  const [driver, setDriver] = useState(defaultDriver);
  const [error, setError] = useState(true);

  const vehicleOptions = [
    { key: "small", text: "Small", value: "small" },
    { key: "medium", text: "Medium", value: "medium" },
    { key: "big", text: "Big", value: "big" }
  ];

  // Set data to state
  const handleChange = e => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };
  // update checkbox data to state
  const handleCheckBox = value => {
    setDriver({ ...driver, isAvailable: value });
  };
  // Set vehicle type
  const handleSelection = (e, data) => {
    setDriver({ ...driver, vehicleType: data.value });
  };
  // Validates fields and handle the done action.
  const onFinish = () => {
    let {
      driverName,
      vehicleNumber,
      password,
      vehicleType,
      primaryContact,
      driverAddress
    } = driver;
    if (
      driverName.length === 0 ||
      password.length === 0 ||
      vehicleNumber.length === 0 ||
      vehicleType.length === 0 ||
      primaryContact.length === 0 ||
      driverAddress.length === 0
    ) {
      setError(false);
    } else {
      setError(true);
      setDriver(defaultDriver);
      handleDone(driver);
      handleClose();
    }
  };

  return (
    <Modal dimmer="blurring" open={visible} onClose={handleClose}>
      <Modal.Header>Add driver details</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Driver Name"
              required
              name="driverName"
              onChange={handleChange}
              placeholder="Driver name"
              value={driver.driverName}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Dropdown}
              selection
              label="Vehicle Type"
              required
              options={vehicleOptions}
              name="vehicleType"
              placeholder="Type"
              onChange={handleSelection}
              value={driver.vehicleType}
            />
            <Form.Field
              control={Input}
              label="Vehicle Number"
              required
              type="text"
              name="vehicleNumber"
              onChange={handleChange}
              placeholder="VehicleNumber"
              value={driver.vehicleNumber.toUpperCase()}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Primary Contact"
              required
              maxLength={10}
              type="tel"
              name="primaryContact"
              onChange={handleChange}
              placeholder="Phone number"
              value={driver.primaryContact}
            />
            <Form.Field
              control={Input}
              label="Seconday Contact"
              maxLength={10}
              type="tel"
              name="secondaryContact"
              onChange={handleChange}
              placeholder="Phone number"
              value={driver.secondaryContact}
            />
          </Form.Group>
          <Form.Field
            control={Input}
            label="Set Password for Driver"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={driver.password}
          />
          <Form.Field
            id="form-textarea-control-opinion"
            control={TextArea}
            label="Driver Address"
            placeholder="Address"
            onChange={handleChange}
            name="driverAddress"
            value={driver.driverAddress}
          />
          <Form.Checkbox
            checked={driver.isAvailable}
            name="isAvailable"
            onChange={e => {
              handleCheckBox(!driver.isAvailable);
            }}
            label="Available"
          />
          <Message
            error={error}
            color="red"
            content="Fill in all the required fields."
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Close" onClick={handleClose} />
        <Button positive content="Done" onClick={onFinish} />
      </Modal.Actions>
    </Modal>
  );
};

AddDriverModal.propTypes = {
  /**
   * Set's the visibility of modal.
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Function to close the modal.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Function to handle done action.
   */
  handleDone: PropTypes.func.isRequired
};

export default AddDriverModal;
