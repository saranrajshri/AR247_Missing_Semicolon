import React, { useContext } from "react";
import "./IncomingOrders.css";
import { Card, CardContent, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { DriverContext } from "../../../../Context/DriverContext";
import { markAsPicked } from "../../../../actions/actions";
import { useToast } from "../../../../Context/ToastContext";

const IncomingOrders = () => {
  const {
    orders,
    setOrders,
    setSelectedComponent,
    watchDriverPosition
  } = useContext(DriverContext);
  const { addToast } = useToast();

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  // Start the journey of the driver
  const handleStart = (order, index) => {
    markAsPicked(order.driverID, order.supplierID, order.orderID)
      .then(res => {
        // update in the context
        const tempOrders = orders;
        tempOrders[index].isOrderDispatched = true;
        setOrders(tempOrders);

        addToast({
          type: "success",
          message: "Order Picked Successfully!."
        });

        // redirect
        sleep(3000).then(() => {
          // start sharing the real time data of the driver
          // addToast({});
          watchDriverPosition(order.supplierID, order.orderID);
          // window.location.reload();
          setSelectedComponent("CurrentOrders");
        });
      })
      .catch(err => {
        addToast({
          type: "danger",
          message: "Failed to update details!."
        });
      });
  };

  return (
    <div id="driver">
      {orders.map((order, index) =>
        order.isOrderDispatched === false && order.isOrderAssigned ? (
          <div className="card" key={index}>
            <Card fluid>
              <CardContent>
                <div>{/* <h3 className="header">{order.driverID}</h3> */}</div>
                <hr className="normal" />
                <div className="justify-content" style={{ padding: 10 }}>
                  <div style={{ textAlign: "left" }}>
                    <text>PICK UP LOCATION:</text>
                    <p className="address">
                      {order.tripData.pickUpLocationName}
                    </p>
                  </div>
                  <hr className="vertical" />
                  <div style={{ textAlign: "right" }}>
                    <text>DROP LOCATION:</text>
                    <p className="address">{order.tripData.dropLocationName}</p>
                  </div>
                </div>
                <span className="contact">
                  CUSTOMER CONTACT :{"  "}
                  <a
                    href={`tel:${order.customerData.phoneNumber}`}
                    className="phone"
                  >
                    {order.customerData.phoneNumber}
                  </a>
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    style={{ marginLeft: 10 }}
                  />
                </span>
                <hr className="normal" style={{ marginTop: 20 }} />
                <div className="justify-content" style={{ marginTop: 20 }}>
                  <span className="distance-div">
                    EST. TIME:{" "}
                    <span className="distance">
                      {(order.tripData.baseTime / 3600).toFixed(0)}
                      {" HR"}
                    </span>
                    {", "}
                    <span style={{ marginLeft: 10 }}>
                      EST. DIST :{" "}
                      <span className="distance">
                        {(order.tripData.distance / 1000).toFixed(0)}
                        {" KM"}
                      </span>
                    </span>
                  </span>

                  <Button
                    primary
                    size={"mini"}
                    onClick={() => handleStart(order, index)}
                  >
                    START
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null
      )}
    </div>
  );
};

export default IncomingOrders;
