import React from "react";
import "./App.css";

// Global State Provider
import ContextProvider from "./Context/Context";
import FarmerContextProvider from "./Context/FarmerContext";
import DriverContextProvider from "./Context/DriverContext";
import ToastProvider from "./Context/ToastContext";

import Routes from "./Routes";

const App = () => {
  return (
    <ContextProvider>
      <FarmerContextProvider>
        <DriverContextProvider>
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </DriverContextProvider>
      </FarmerContextProvider>
    </ContextProvider>
  );
};

export default App;
