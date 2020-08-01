import React, { useContext, useEffect } from "react";
import "./CurrentOrders.css";
import { Card, CardContent, Button, Divider } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faRupeeSign,
  faPhoneAlt,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { DriverContext } from "../../../../Context/DriverContext";
import { markAsDelivered } from "../../../../actions/actions";
import { useToast } from "../../../../Context/ToastContext";

const CurrentOrders = () => {
  const { orders, watchDriverPosition } = useContext(DriverContext);
  const { addToast } = useToast();

  const openGoogleMaps = (pickUpLocationName, dropLocationName) => {
    const pickUpLocation = pickUpLocationName.replace(" ", "+");
    const dropLocation = dropLocationName.replace(" ", "+");
    const URL = `https://www.google.com/maps/dir/?api=1&origin=${pickUpLocation}&destination=${dropLocation}`;
    window.open(URL, "_blank");
  };

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const handleDelivered = (orderID, supplierID) => {
    markAsDelivered(orderID, supplierID)
      .then(res => {
        addToast({
          type: "success",
          message: "Order Completed Successfully"
        });
        // Redirect to current orders page
        sleep(3000).then(() => {
          window.location.reload();
        });
      })
      .catch(err => {
        addToast({
          type: "negative",
          message: err.response.data.error.message
        });
      });
  };

  const startLocationSharing = order => {
    addToast({
      type: "success",
      message: "Location Sharing Started..!"
    });

    // redirect
    sleep(3000).then(() => {
      // start sharing the real time data of the driver
      // addToast({});
      watchDriverPosition(order.supplierID, order.orderID);
      // window.location.reload();
    });
  };

  useEffect(() => {
    const filteredOrders = orders.filter(
      order => order.isOrderDispatched && order.isOrderDelivered === false
    );
    if (
      filteredOrders.length !== 0 &&
      filteredOrders[0].isOrderDispatched &&
      filteredOrders[0].isOrderDelivered === false
    ) {
      startLocationSharing(filteredOrders[0]);
    }
  }, []);
  return (
    <div id="driver">
      {orders.map((order, index) => {
        return order.isOrderDispatched && order.isOrderDelivered === false ? (
          <div className="card" key={index}>
            <Card fluid>
              <CardContent>
                <div className="grid-container">
                  <div className="grid-item">
                    <p className="text-bold text-dark-blue">Customer Name</p>
                    <p className="text-dark">
                      {order.tripData.dropLocationName}
                    </p>
                  </div>
                  <div className="grid-item">
                    <div className="float-right-container">
                      <Button
                        primary
                        onClick={() =>
                          openGoogleMaps(
                            order.tripData.pickUpLocationName,
                            order.tripData.dropLocationName
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="icon"
                        />
                        Show in Map
                      </Button>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="grid-container">
                  <div className="grid-item">
                    <p className="text-bold text-dark-blue">
                      Order No : {order.orderID}
                    </p>
                    <p className="text-dark">
                      No of products : {order.orderData.products.length}
                    </p>
                  </div>
                  <div className="grid-item">
                    <div className="float-right-container">
                      <p className="text-price">
                        <FontAwesomeIcon icon={faRupeeSign} className="icon" />
                        {order.orderData.orderPrice}
                        <br />
                        to pay
                      </p>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="grid-container">
                  <div className="grid-item">
                    <p className="text-bold text-dark-blue">Supplier Contact</p>
                    <Button primary>
                      <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
                      Call Supplier
                    </Button>
                  </div>
                  <div className="grid-item">
                    <div className="float-right-container">
                      <p className="text-bold text-dark-blue">
                        Customer Contact
                      </p>
                      <Button primary>
                        <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
                        Call Customer
                      </Button>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="grid-container">
                  <div className="grid-item">
                    <Button color="red">Report a problem</Button>
                  </div>
                  <div className="grid-item">
                    <div className="float-right-container">
                      <Button
                        color="green"
                        onClick={() =>
                          handleDelivered(order.orderID, order.supplierID)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="icon"
                        />
                        Delivered
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default CurrentOrders;
