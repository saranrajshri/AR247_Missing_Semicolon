import React, { useEffect } from "react";
import "./App.css";

import AddToHomescreen from "react-add-to-homescreen";

// Global State Provider
import ContextProvider from "./Context/Context";
import FarmerContextProvider from "./Context/FarmerContext";
import DriverContextProvider from "./Context/DriverContext";
import ToastProvider from "./Context/ToastContext";

import Routes from "./Routes";

const App = () => {
  const handleAddToHomescreenClick = () => {
    alert(`
    1. Open Share menu
    2. Tap on "Add to Home Screen" button`);
  };

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  const handleOnline = () => {
    console.log("Stable network detected..Updating data to DB");
    sleep(2000).then(() => {
      console.log("Updated to DB...");
    });
  };

  const print = () => {
    var data = [
      {
        lat: 13.0827,
        lon: 80.2707
      }
    ];
    console.log(`Storing Location Details - `, data);
    sleep(3000).then(() => {
      print();
    });
  };

  const handleOffline = () => {
    console.log(
      "Detected Unstable Network..Storing coordinates in localStorage"
    );
    print();
  };
  useEffect(() => {
    window.addEventListener("online", () => handleOnline());
    window.addEventListener("offline", () => handleOffline());
  }, []);
  return (
    <ContextProvider>
      <FarmerContextProvider>
        <DriverContextProvider>
          <ToastProvider>
            <AddToHomescreen
              onAddToHomescreenClick={handleAddToHomescreenClick}
            />
            <Routes />
          </ToastProvider>
        </DriverContextProvider>
      </FarmerContextProvider>
    </ContextProvider>
  );
};

export default App;
