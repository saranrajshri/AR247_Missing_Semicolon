import React, { useState, createContext } from "react";

export const Context = createContext();

// Global state provider
const ContextProvider = props => {
  const [selectedComponent, setSelectedComponent] = useState("ManageOrders");
  const [supplierData, setSupplierData] = useState({});
  const [isFullScreenLoaderVisible, setFullScreenLoader] = useState(false);
  const [isAlertOpen, setAlert] = useState({
    alertType: "",
    isOpen: false,
    message: ""
  });
  const [orderToBeDispatched, setOrderToBeDispatched] = useState({});

  // Real Time Data State
  const [supplierMappings, setSupplierMappings] = useState({});
  const [products, setProducts] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [liveUpdates, setLiveUpdates] = useState({
    allVehicles: 0,
    onMove: 0
  });
  return (
    <Context.Provider
      value={{
        selectedComponent,
        setSelectedComponent,
        isFullScreenLoaderVisible,
        setFullScreenLoader,
        liveUpdates,
        setLiveUpdates,
        orderToBeDispatched,
        setOrderToBeDispatched,
        isAlertOpen,
        setAlert,
        products,
        supplierData,
        setSupplierData,
        setProducts,
        drivers,
        orders,
        setOrders,
        setDrivers,
        supplierMappings,
        setSupplierMappings
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
