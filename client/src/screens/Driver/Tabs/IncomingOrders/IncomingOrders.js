import React, { useContext } from "react";
import "./IncomingOrders.css";
import { Card, CardContent, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { DriverContext } from "../../../../Context/DriverContext";
import { markAsPicked } from "../../../../actions/actions";
import { useToast } from "../../../../Context/ToastContext";

const IncomingOrders = () => {

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
                    //onClick={() => handleStart(order, index)}
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

const orders = [{
    isOrderDispatched : false,
    isOrderAssigned : true,
    tripData : {
        pickUpLocationName: "Ramanathapuram",
        dropLocationName: "Chennai",
        baseTime: 987898,
        distance: 100000
    },
    customerData: {
        phoneNumber: 1234567890
    }
},
{
    isOrderDispatched : false,
    isOrderAssigned : true,
    tripData : {
        pickUpLocationName: "Ramanathapuram",
        dropLocationName: "Chennai",
        baseTime: 987898,
        distance: 100000
    },
    customerData: {
        phoneNumber: 1234567890
    }
}, 
];