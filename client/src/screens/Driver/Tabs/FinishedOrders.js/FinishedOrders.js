import React, { useContext } from "react";
import "./FinishedOrders.css";
import { Card, CardContent } from "semantic-ui-react";
import { DriverContext } from "../../../../Context/DriverContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

const FinishedOrders = () => {
  const { orders } = useContext(DriverContext);
  return (
    <div id="driver">
      {orders.map((order, index) =>
        order.isOrderDispatched &&
        order.isOrderDelivered &&
        order.isOrderAssigned ? (
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
              </CardContent>
            </Card>
          </div>
        ) : null
      )}
    </div>
  );
};

export default FinishedOrders;
