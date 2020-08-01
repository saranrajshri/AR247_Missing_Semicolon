import React, { useState, createContext } from "react";

export const FarmerContext = createContext();

// Global state provider
const FarmerContextProvider = (props) => {
  const [selectedComponent, setSelectedComponent] = useState("ProductsView");
  const [farmerData, setFarmerData] = useState({});
  const [isFullScreenLoaderVisible, setFullScreenLoader] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  // Real Time Data State
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <FarmerContext.Provider
      value={{
        selectedComponent,
        setSelectedComponent,
        isFullScreenLoaderVisible,
        setFullScreenLoader,
        products,
        farmerData,
        setFarmerData,
        setProducts,
        selectedProducts,
        setSelectedProducts,
        cart,
        setCart
      }}
    >
      {props.children}
    </FarmerContext.Provider>
  );
};

export default FarmerContextProvider;
