import React, { useContext, useState } from "react";
import "./IncomingOrders.css";
import { Context } from "../../../../../Context/Context";
import NewOrdersTable from "./components/NewOrdersTable";
import OrderDetailsModal from "./components/OrderDetailsModal";

const IncomingOrders = () => {
  const {
    orders,
    setSelectedComponent,
    setOrderToBeDispatched,
    drivers
  } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderToTrack, setOrderToTrack] = useState(orders[0]);

  const onDispatch = order => {
    setOrderToBeDispatched(order);
    setSelectedComponent("AssignDrivers");
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleTrack = order => {
    setOrderToTrack(order);
    setModalVisible(true);
  };

  return (
    <div className="p-5">
      <p className="title text-dark">New Orders</p>
      {/* Orders table */}
      <NewOrdersTable
        orders={orders}
        handleDispatch={onDispatch}
        onTrack={handleTrack}
      />
      {/* Track order modal */}
      <OrderDetailsModal
        orderDetails={orderToTrack}
        drivers={drivers}
        onClose={handleClose}
        visible={modalVisible}
      />
    </div>
  );
};

export default IncomingOrders;
