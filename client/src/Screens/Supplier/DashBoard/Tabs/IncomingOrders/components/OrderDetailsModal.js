import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "semantic-ui-react";
import TrackOrderMap from "./TrackOrderMap";
/**
 * Modal showing order details of tracking order.
 * @param {Props} props
 */
const OrderDetailsModal = (props) => {
  const { orderDetails, visible, onClose, drivers } = props;
  const [order, setOrder] = useState(orderDetails);
  const [driver, setDriver] = useState({ driverName: "", primaryContact: 11 });

  useEffect(() => {
    const setOrderDetails = () => {
      setOrder(orderDetails);
    };
    setOrderDetails();
  }, [orderDetails]);

  useEffect(() => {
    const setDriverDetail = () => {
      let driv = drivers.find((d) => d.driverID === order.driverID);
      if (driv !== undefined) {
        setDriver(driv);
      }
    };
    setDriverDetail();
  }, [drivers, order]);

  return (
    <Modal
      open={visible}
      onClose={onClose}
      dimmer="blurring"
      size="large"
      closeIcon
    >
      <Modal.Header>Track Order</Modal.Header>
      <Modal.Content style={{ padding: "0px", height: "500px" }}>
        <div className="grid-container-7-3">
          <div className="grid-items">
            <TrackOrderMap
              pickUpCoordinates={[
                order.tripData.pickUpCoordinates.lat,
                order.tripData.pickUpCoordinates.lon
              ]}
              dropCoordinates={order.tripData.dropCoordinates}
              currentCoordinates={[13.5452414, 80.0665677]}
            />
          </div>
          <div className="grid-items grid-details">
            <img
              src="https://i.ibb.co/MsZSMDn/truck.jpg"
              width="100%"
              height="200px"
              alt="truck"
            />
            <div className="ship-details">
              <p className="ship-label">customer details</p>
              <div className="ship-info">
                <p>
                  Name: <span>{order.customerData.customerName}</span>
                </p>
                <p>
                  Contact: <span>{order.customerData.phoneNumber}</span>
                </p>
              </div>
              <p className="ship-label">driver details</p>
              <div className="ship-info">
                <p>
                  Name: <span>{driver.driverName}</span>
                </p>
                <p>
                  Contact: <span>{driver.primaryContact}</span>
                </p>
              </div>
              <p className="ship-label">shipping details</p>
              <div className="ship-info">
                <p className="addr">
                  From: <span>{order.tripData.pickUpLocationName}</span>
                </p>
                <p className="addr">
                  To: <span>{order.tripData.dropLocationName}</span>
                </p>
              </div>
              <p className="ship-label">product details</p>
              <div className="ship-info">
                <Table collapsing fixed style={{ width: "270px" }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {order.orderData.products.map((product) => {
                      return (
                        <Table.Row
                          key={product.barCode}
                          title={product.barCode}
                        >
                          <Table.Cell>{product.productName}</Table.Cell>
                          <Table.Cell collapsing>{product.quantity}</Table.Cell>
                          <Table.Cell collapsing>
                            {product.productPrice}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  /**
   * Details of order to be tracked.
   */
  orderDetails: PropTypes.object.isRequired,
  /**
   * Drivers array with drivers details.
   */
  drivers: PropTypes.array.isRequired,
  /**
   * Set's modal visibility.
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Function to close modal.
   */
  onClose: PropTypes.func.isRequired
};

OrderDetailsModal.defaultProps = {
  orderDetails: {
    orderID: "",
    customerData: {
      customerName: "",
      phoneNumber: 1111111111
    },
    driverID: "",
    isOrderAssigned: true,
    isOrderDelivered: false,
    isOrderDispatched: false,
    supplierID: "",
    orderData: {
      driverPrice: 1,
      orderPrice: 1,
      products: [
        {
          barCode: "",
          productName: "",
          productPrice: 1,
          quantity: 1,
          supplierID: ""
        }
      ]
    },
    tripData: {
      baseTime: 1,
      checkpoints: [],
      distance: 1,
      dropCoordinates: [14, 79],
      dropLocationName: "",
      labels: [],
      pickUpCoordinates: { lat: 13, lon: 80 },
      pickUpLocationName: ""
    }
  },
  drivers: [
    {
      driverID: "1",
      driverName: "",
      primaryContact: 111
    }
  ]
};

export default OrderDetailsModal;
