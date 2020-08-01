import React from "react";
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
