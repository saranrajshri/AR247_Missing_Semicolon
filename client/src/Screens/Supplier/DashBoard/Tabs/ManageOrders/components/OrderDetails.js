import React from "react";
import PropTypes from "prop-types";
/**
 * Shows order detail in popup.
 * @component
 * @param {Props} props
 */
const OrderDetails = props => {
  const { order, driver } = props;
  return (
    <div className="popup-grid-container details-items">
      <div className="grid-item">
        <div className="card">
          <div className="card-header">Order</div>
          <div className="card-content">
            <p>
              <span>ID</span>
              {order.orderID}
            </p>
            <p>
              <span>Status</span>
              {order.isOrderDispatched
                ? order.isOrderDelivered
                  ? "Delivered"
                  : "Dispatched"
                : "Not Picked "}
            </p>
          </div>
        </div>
      </div>
      <div className="grid-item">
        <div className="card">
          <div className="card-header">Driver</div>
          <div className="card-content">
            <p>
              <span>ID</span>
              {driver.driverID}
            </p>
            <p>
              <span>Vehicle</span>
              {driver.vehicleType}
            </p>
          </div>
        </div>
      </div>
      <div className="grid-item">
        <div className="card">
          <div className="card-header">Address</div>
          <div className="card-content">
            <p>
              <span>From</span>
              {order.tripData.pickUpLocationName}
            </p>
            <p>
              <span>To</span>
              {order.tripData.dropLocationName}
            </p>
          </div>
        </div>
      </div>
      <div className="grid-item">
        <div className="card">
          <div className="card-header">Customer</div>
          <div className="card-content">
            <p>
              <span>Name</span>
              {order.customerData.customerName}
            </p>
            <p>
              <span>Contact</span>
              {order.customerData.phoneNumber}
            </p>
          </div>
        </div>
      </div>
      <div className="grid-item">
        <div className="card">
          <div className="card-header">Products</div>
          <div className="card-content">
            <p>
              <span>Quantity</span>
              {order.orderData.products.length}
            </p>
            <p>
              <span>Price</span>
              {order.orderData.orderPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  /**
   * Order object with order detials
   */
  order: PropTypes.object.isRequired,
  /**
   * Driver object with driver detials
   */
  driver: PropTypes.object.isRequired
};

export default OrderDetails;
