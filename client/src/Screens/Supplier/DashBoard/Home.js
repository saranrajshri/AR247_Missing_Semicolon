import React, { useContext, useEffect } from "react";

// Components
import Header from "../../../components/Supplier/Header/Header";
import Sidebar from "../../../components/Supplier/Sidebar/Sidebar";

// Tabs
import {
  ManageProducts,
  AddProduct,
  ManageDrivers,
  ManageOrders,
  CalculateTripCost,
  AssignDrivers,
  IncomingOrders,
  Settings,
  Notifications,
} from "./Tabs";

// Context
import { Context } from "../../../Context/Context";

// Components
import Spinner from "../../../components/Global/Loader/Loader";
import Alert from "../../../components/Global/Alerts/Alert";

// Actions
import {
  getProductsOfASupplier,
  getDriversOfASupplier,
  getOrdersOfASupplier,
  isSupplierAuthenticated,
  getLiveUpdates,
  getNotificationsOfASupplier,
} from "../../../actions/actions";

import socketIOClient from "socket.io-client";
import constants from "../../../Constants/constants";
import Overview from "./Tabs/Overview/Overview";

const socket = socketIOClient(`${constants.SOCKET_ENDPOINT}`);
socket.on("connect", () => {
  socket.send("User connected");
});

const Home = () => {
  const {
    isFullScreenLoaderVisible,
    selectedComponent,
    isAlertOpen,
    setProducts,
    setDrivers,
    setAlert,
    setOrders,
    setFullScreenLoader,
    setSupplierData,
    setNotifications,
    setLiveUpdates,
  } = useContext(Context);

  // Components mapping
  var mapping = {
    ManageProducts: ManageProducts,
    AddProduct: AddProduct,
    ManageDrivers: ManageDrivers,
    CalculateTripCost: CalculateTripCost,
    AssignDrivers: AssignDrivers,
    ManageOrders: ManageOrders,
    IncomingOrders: IncomingOrders,
    Settings: Settings,
    Notifications: Notifications,
    Overview: Overview,
  };
  var Component = mapping[selectedComponent];

  // Socket Listeners
  const initializeSocketListeners = () => {
    // listener to receive real time products data
    socket.on("products", (products) => {
      setProducts(products);
    });

    socket.on("drivers", (drivers) => {
      setDrivers(drivers);
    });
    socket.on("orders", (orders) => {
      // setOrders(orders);
    });
    socket.on("notifications", (notifications) => {
      // setOrders(orders);
      setNotifications(notifications);
      // console.log(notifications);
    });
    socket.on("liveUpdates", (liveUpdates) => {
      setLiveUpdates(liveUpdates);
    });
  };

  const supplierAuth = async () => {
    setFullScreenLoader(true);
    await isSupplierAuthenticated()
      .then((res) => {
        setFullScreenLoader(false);
        setSupplierData(res.data);
        getProductsOfASupplier(res.data._id);
        getDriversOfASupplier(res.data._id);
        getNotificationsOfASupplier(res.data._id).then((res) => {
          console.log(res.data);
        });
        getOrdersOfASupplier(res.data._id).then((res) => {
          setOrders(res.data);
        });
        getLiveUpdates(res.data._id);
      })
      .catch(() => {
        setFullScreenLoader(false);
        window.location = "/supplier/login";
      });
  };

  const getDataFromDB = async () => {
    supplierAuth();
  };

  // Component Did Mount
  // Function to get the data such as Orders, Products, Drivers of the supplier
  useEffect(() => {
    initializeSocketListeners();
    // getDataFromDB();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        {isAlertOpen.isOpen ? (
          <Alert
            alertType={isAlertOpen.alertType}
            message={isAlertOpen.message}
            handleClose={() => setAlert({})}
          />
        ) : null}
        {/* Dynamic Component */}
        <Component />
      </div>

      {/* Loader */}
      {isFullScreenLoaderVisible ? <Spinner /> : null}
    </div>
  );
};
export default Home;
