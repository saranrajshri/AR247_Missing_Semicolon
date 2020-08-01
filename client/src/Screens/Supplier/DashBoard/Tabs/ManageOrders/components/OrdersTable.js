import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Icon, Popup } from "semantic-ui-react";
import OrderDetails from "./OrderDetails";

/**
 * Display orders in table with status and details.
 * @component
 * @param {Props} props
 */

const OrdersTable = props => {
  const { orders } = props;
  const [drivers, setDrivers] = useState(props.drivers);

  useEffect(() => setDrivers(props.drivers), [props.drivers]);
  return (
    <Table celled striped selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Order ID</Table.HeaderCell>
          <Table.HeaderCell>Driver Name</Table.HeaderCell>
          <Table.HeaderCell>Contact</Table.HeaderCell>
          <Table.HeaderCell>Vehicle Number</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map(order => {
          if (order.isOrderAssigned && order.isOrderDelivered === false) {
            let driver = drivers.find(
              driver => driver.driverID === order.driverID
            );
            if (drivers.length === 0) return null;
            return (
              <Popup
                trigger={
                  <Table.Row key={order.orderID}>
                    <Table.Cell>{order.orderID}</Table.Cell>
                    <Table.Cell>{driver.driverName}</Table.Cell>
                    <Table.Cell>{driver.primaryContact}</Table.Cell>
                    <Table.Cell>
                      {driver.vehicleNumber.toUpperCase()}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {order.currentStatus !== undefined ? (
                        order.currentStatus.status === "onMove" ? (
                          <Icon name="toggle on" size="large" color="green" />
                        ) : (
                          <Icon name="toggle off" size="large" color="red" />
                        )
                      ) : (
                        <Icon name="toggle off" size="large" color="red" />
                      )}
                    </Table.Cell>
                  </Table.Row>
                }
                on="click"
                pinned
                flowing
                hoverable
              >
                <OrderDetails order={order} driver={driver} />
              </Popup>
            );
          }
        })}
      </Table.Body>
    </Table>
  );
};

OrdersTable.propTypes = {
  /**
   * Array of order objects
   */
  orders: PropTypes.array.isRequired,
  /**
   * Array of driver objects
   */
  drivers: PropTypes.array.isRequired
};

export default OrdersTable;
