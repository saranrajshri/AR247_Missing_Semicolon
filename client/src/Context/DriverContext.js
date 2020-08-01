import React, { useState, createContext } from "react";
import { updateCurrentStatusOfOrder } from "../actions/actions";

export const DriverContext = createContext();

// Global state provider
const DriverContextProvider = (props) => {
  const [selectedComponent, setSelectedComponent] = useState("IncomingOrders");
  const [currentCoordinates, setCurrentCoordinates] = useState({});
  const [lastRecordedCoordinates, setLastRecordedCoordinates] = useState({});

  const [driverData, setDriverData] = useState({
    _id: "5f0e56d4eadc2a20c678c330",
    driverID: "DR-1"
  });
  const [isFullScreenLoaderVisible, setFullScreenLoader] = useState(false);

  //   orders
  const [orders, setOrders] = useState([]);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const getLocationUpdate = async (supplierID, orderID) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var data = {
          lat: latitude,
          lon: longitude
        };
        setCurrentCoordinates(data);
        var status;
        if (currentCoordinates !== lastRecordedCoordinates) {
          status = "onMove";
        } else {
          status = "idle";
        }
        var dataToBeSent = {
          currentStatus: {
            coordinates: data,
            status: status
          }
        };

        setLastRecordedCoordinates(data);

        updateCurrentStatusOfOrder(supplierID, orderID, dataToBeSent)
          .then((res) => {
            console.log("Location updated", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        // update the location into DB for every minute
        sleep(60000).then(() => {
          getLocationUpdate(supplierID, orderID);
        });
      });
    } else {
      alert("no support");
    }
  };

  const watchDriverPosition = (supplierID, orderID) => {
    getLocationUpdate(supplierID, orderID);
  };
  return (
    <DriverContext.Provider
      value={{
        selectedComponent,
        setSelectedComponent,
        orders,
        currentCoordinates,
        setCurrentCoordinates,
        setOrders,
        isFullScreenLoaderVisible,
        setFullScreenLoader,
        driverData,
        setDriverData,
        watchDriverPosition
      }}
    >
      {props.children}
    </DriverContext.Provider>
  );
};

export default DriverContextProvider;
