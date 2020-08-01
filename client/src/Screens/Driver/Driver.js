import React, { useState, useContext, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import IncomingOrders from "./Tabs/IncomingOrders/IncomingOrders";
import Header from "../../components/Driver/Header/Header";
import CurrentOrders from "./Tabs/CurrentOrders/CurrentOrders";
import FinishedOrders from "./Tabs/FinishedOrders/FinishedOrders";
import { DriverContext } from "../../Context/DriverContext";
import { getOrdersOfDriver } from "../../actions/actions";

const Driver = () => {
  const {
    selectedComponent,
    setSelectedComponent,
    driverData,
    setOrders
  } = useContext(DriverContext);
  const [activeItem, setActiveItem] = useState("IncomingOrders");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    setSelectedComponent(name);
  };
  var mapping = {
    IncomingOrders: IncomingOrders,
    CurrentOrders: CurrentOrders,
    FinishedOrders: FinishedOrders
  };
  var Component = mapping[selectedComponent];

  // get the location of the driver

  // get the orders of the driver
  useEffect(() => {
    const getDriverOrders = () => {
      getOrdersOfDriver(driverData.driverID)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getDriverOrders();
  }, []);
  return (
    <div>
      <Header />
      <Component />
      <Menu fixed="bottom" tabular>
        <Menu.Item
          className="driver-footer-item"
          name="IncomingOrders"
          active={activeItem === "IncomingOrders"}
          onClick={handleItemClick}
        >
          Incoming Orders
        </Menu.Item>

        <Menu.Item
          className="driver-footer-item"
          name="CurrentOrders"
          active={activeItem === "CurrentOrders"}
          onClick={handleItemClick}
        >
          Current Orders
        </Menu.Item>

        <Menu.Item
          className="driver-footer-item"
          name="FinishedOrders"
          active={activeItem === "FinishedOrders"}
          onClick={handleItemClick}
        >
          Finished Orders
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Driver;
