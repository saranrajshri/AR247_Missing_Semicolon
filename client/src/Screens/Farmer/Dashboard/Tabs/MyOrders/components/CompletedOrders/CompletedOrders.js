import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";

const CompletedOrders = ({ orders }) => {
  return (
    <div style={{ marginRight: "7px", marginLeft: "7px" }}>
      {orders.map((order) => (
        <div className="card">
          <div className="card-header">{order.orderID}</div>
          <div className="card-content">
            <p style={{ fontSize: "18px", color: "#888888" }}>
              Product Name:{" "}
              <span
                style={{
                  fontSize: "17px",
                  paddingLeft: "5px",
                  color: "#212121"
                }}
              >
                {order.orderData.products[0].productName}
              </span>
            </p>
            <p style={{ fontSize: "17 px", color: "#888888" }}>
              Total Price:{" "}
              <span
                style={{
                  fontSize: "17px",
                  paddingLeft: "5px",
                  color: "#212121"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                {order.orderData.orderPrice}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

CompletedOrders.propTypes = {
  orders: PropTypes.array.isRequired
};
CompletedOrders.defaultProps = {
  orders: [
    {
      orderID: "orderID",
      orderData: {
        orderPrice: 100,
        products: [
          {
            productName: "name"
          }
        ]
      }
    }
  ]
};

export default CompletedOrders;
