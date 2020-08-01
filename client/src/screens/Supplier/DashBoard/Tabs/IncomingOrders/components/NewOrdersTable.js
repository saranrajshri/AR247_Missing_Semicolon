import React from "react";
import PropTypes from "prop-types";
import { Table, Button, Icon } from "semantic-ui-react";
/**
 * Display new orders in table with details.
 * @component
 * @param {Props} props
 */
const NewOrdersTable = props => {
  const { orders, handleDispatch, onTrack } = props;
  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Custmer Name</Table.HeaderCell>
          <Table.HeaderCell>Contact</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Delivery Address</Table.HeaderCell>
          <Table.HeaderCell>Order Picked</Table.HeaderCell>
          <Table.HeaderCell>Order Delivered</Table.HeaderCell>
          <Table.HeaderCell>Options</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map(order => (
          <Table.Row key={order.orderID}>
            <Table.Cell>{order.orderID}</Table.Cell>
            <Table.Cell>{order.customerData.customerName}</Table.Cell>
            <Table.Cell>{order.customerData.phoneNumber}</Table.Cell>
            <Table.Cell>{order.orderData.orderPrice}</Table.Cell>
            <Table.Cell>{order.orderData.products.length}</Table.Cell>
            <Table.Cell>{order.tripData.dropLocationName}</Table.Cell>
            <Table.Cell textAlign="center">
              {order.isOrderDispatched ? (
                <Icon name="toggle on" size="large" color="green" />
              ) : (
                <Icon name="toggle off" size="large" color="red" />
              )}
            </Table.Cell>
            <Table.Cell textAlign="center">
              {order.isOrderDelivered ? (
                <Icon name="toggle on" size="large" color="green" />
              ) : (
                <Icon name="toggle off" size="large" color="red" />
              )}
            </Table.Cell>
            <Table.Cell textAlign="center">
              {order.isOrderAssigned ? (
                <Button title="Track Order" onClick={() => onTrack(order)}>
                  <Icon name="marker" fitted color="green" />
                </Button>
              ) : (
                <Button
                  onClick={() => handleDispatch(order)}
                  title="Dispatch Order"
                >
                  <Icon name="truck" fitted color="blue" />
                </Button>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

NewOrdersTable.propTypes = {
  /**
   * Array of order objects
   */
  orders: PropTypes.array.isRequired,
  /**
   * Function to handle dispatch button.
   */
  handleDispatch: PropTypes.func.isRequired,
  /**
   * Set the product to be tracked and modal visible.
   */
  onTrack: PropTypes.func.isRequired
};

export default NewOrdersTable;
