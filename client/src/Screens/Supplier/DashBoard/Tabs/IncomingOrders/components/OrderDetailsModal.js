import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "semantic-ui-react";
import TrackOrderMap from "./TrackOrderMap";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "../IncomingOrders.css";
/**
 * Modal showing order details of tracking order.
 * @param {Props} props
 */

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  stepTime: {
    fontSize: "10px",
    color: "#777777",
    paddingLeft: "10px",
    fontStyle: "italic"
  }
}));

const OrderDetailsModal = (props) => {
  const { orderDetails, visible, onClose, drivers } = props;
  const [order, setOrder] = useState(orderDetails);
  const [driver, setDriver] = useState({ driverName: "", primaryContact: 11 });
  const [steps, setSteps] = useState([]);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);

  useEffect(() => {
    const setOrderDetails = () => {
      setOrder(orderDetails);
      setSteps(() => [
        {
          l: orderDetails.tripData.pickUpLocationName,
          t: orderDetails.orderPickedTime
        },
        {
          l: orderDetails.tripData.checkpoints[0].locationName,
          t: orderDetails.tripData.checkpoints[0].checkinTime
        },
        {
          l: orderDetails.tripData.checkpoints[1].locationName,
          t: orderDetails.tripData.checkpoints[1].checkinTime
        },
        {
          l: orderDetails.tripData.dropLocationName,
          t: orderDetails.orderDeliveredTime
        }
      ]);
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
            <div className={classes.root}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.l}>
                    <StepLabel>
                      {step.l}
                      {(index === 0 || index === 1) && (
                        <span className={classes.stepTime}>{step.t}</span>
                      )}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>Delivery finished</Typography>
                </Paper>
              )}
            </div>
            <div className="ship-details">
              <p className="ship-label">trip info</p>
              <div className="ship-info">
                <p>
                  Rest Time:{" "}
                  <span>
                    {(
                      parseFloat(
                        order.restTime.endTime.substring(0, 5)
                      ).toFixed(2) -
                      parseFloat(
                        order.restTime.startTime.substring(0, 5)
                      ).toFixed(2)
                    ).toFixed(2) * 100}{" "}
                    min
                  </span>
                </p>
              </div>
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
      checkpoints: [{ locationName: "" }],
      distance: 1,
      dropCoordinates: [14, 79],
      dropLocationName: "",
      labels: [],
      pickUpCoordinates: { lat: 13, lon: 80 },
      pickUpLocationName: ""
    },
    restTime: { startTime: "", endTime: "" }
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
