import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const CompletedOrders = ({ orders }) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  return (
    <div style={{ marginRight: "7px", marginLeft: "7px" }}>
      {orders.map((order) => (
        <div
          className="card"
          onClick={() => history.push("/farmer/orders/orderReceipt")}
        >
          <div className="card-header">{order.orderID}</div>
          <div className="card-content">
            <p
              style={{
                fontSize: "17px",
                color: "#555555",
                fontFamily: "openSansSemiBold"
              }}
            >
              {t("pName")}:{" "}
              <span
                style={{
                  fontSize: "17px",
                  paddingLeft: "5px",
                  color: "#212121",
                  fontFamily: "openSans"
                }}
              >
                {order.orderData.products[0].productName}
              </span>
            </p>
            <p
              style={{
                fontSize: "17px",
                color: "#555555",
                fontFamily: "openSansSemiBold"
              }}
            >
              {t("tPrice")}:{" "}
              <span
                style={{
                  fontSize: "17px",
                  paddingLeft: "5px",
                  color: "#212121",
                  fontFamily: "openSans"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                {order.orderData.orderPrice}
              </span>
            </p>
            <p
              style={{
                fontSize: "17px",
                color: "#555555",
                fontFamily: "openSansSemiBold"
              }}
            >
              Delivered at:{" "}
              <span
                style={{
                  fontSize: "17px",
                  paddingLeft: "5px",
                  color: "#212121",
                  fontFamily: "openSans"
                }}
              >
                {order.orderDeliveredTime}
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
      orderID: "OR-0001",
      orderData: {
        orderPrice: 100,
        products: [
          {
            productName: "Test product"
          }
        ]
      },
      orderDeliveredTime: "11.00PM 01-08-2020"
    }
  ]
};

export default CompletedOrders;
