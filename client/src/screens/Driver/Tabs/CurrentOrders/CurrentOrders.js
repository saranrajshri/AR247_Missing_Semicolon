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
                        // onClick={() =>
                        //   openGoogleMaps(
                        //     order.tripData.pickUpLocationName,
                        //     order.tripData.dropLocationName
                        //   )
                        // }
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
                        // onClick={() =>
                        //   handleDelivered(order.orderID, order.supplierID)
                        // }
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


const orders = [{
    orderID: "OR-1",
    isOrderDispatched : true,
    isOrderAssigned : true,
    isOrderDelivered : false,
    tripData : {
        pickUpLocationName: "Ramanathapuram",
        dropLocationName: "Chennai",
        baseTime: 987898,
        distance: 100000
    },
    customerData: {
        phoneNumber: 1234567890
    },
    orderData : {
        products : [{
            pp : "dlfjdk"
        },
        {
            pp : "dlfjdk"
        }],
        orderPrice : 1123
    }
},
{
    orderID: "OR-1",
    isOrderDispatched : true,
    isOrderAssigned : true,
    isOrderDelivered : false,
    tripData : {
        pickUpLocationName: "Ramanathapuram",
        dropLocationName: "Chennai",
        baseTime: 987898,
        distance: 100000
    },
    customerData: {
        phoneNumber: 1234567890
    },
    orderData : {
        products : [{
            pp : "dlfjdk"
        },
        {
            pp : "dlfjdk"
        }],
        orderPrice : 1123
    }
}];