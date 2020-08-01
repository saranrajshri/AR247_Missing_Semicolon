import React from "react";
import PropTypes from "prop-types";
import { Table, Button, Icon } from "semantic-ui-react";
/**
 * Display drivers in table.
 * @component
 * @param {Props} props
 */
const DriversTable = (props) => {
  const { drivers, handleDelete } = props;
  return (
    <Table celled striped structured fixed>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell rowSpan="2">ID</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Driver Name</Table.HeaderCell>
          <Table.HeaderCell colSpan="2">Vehicle</Table.HeaderCell>
          <Table.HeaderCell colSpan="2">Contact</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Address</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Available</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Delete</Table.HeaderCell>
        </Table.Row>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Number</Table.HeaderCell>
          <Table.HeaderCell>Primary</Table.HeaderCell>
          <Table.HeaderCell>Secondary</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {drivers.map((driver) => (
          <Table.Row key={driver.driverID}>
            <Table.Cell>{driver.driverID}</Table.Cell>
            <Table.Cell singleLine>{driver.driverName}</Table.Cell>
            <Table.Cell>{driver.vehicleType}</Table.Cell>
            <Table.Cell>{driver.vehicleNumber.toUpperCase()}</Table.Cell>
            <Table.Cell>{driver.primaryContact}</Table.Cell>
            <Table.Cell>{driver.secondaryContact}</Table.Cell>
            <Table.Cell>{driver.driverAddress}</Table.Cell>
            <Table.Cell textAlign="center">
              {driver.isAvailable ? (
                <Icon name="toggle on" size="large" color="green" />
              ) : (
                <Icon name="toggle off" size="large" color="red" />
              )}
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Button onClick={() => handleDelete(driver._id)}>
                <Icon name="delete" fitted color="red" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

DriversTable.propTypes = {
  /**
   * Array of driver objects
   */
  drivers: PropTypes.array.isRequired,
  /**
   * Function to handle delete button.
   */
  handleDelete: PropTypes.func.isRequired,
};

export default DriversTable;
