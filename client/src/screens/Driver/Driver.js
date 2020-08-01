import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import IncomingOrders from "./Tabs/IncomingOrders/IncomingOrders";
import CurrentOrders from "./Tabs/CurrentOrders/CurrentOrders";
import Header from "../../components/Driver/Header/Header";

const Driver = () => {
  const [activeItem, setactiveItem] = useState("incoming");
  const handleItemClick = (e, { name }) => setactiveItem(name);
  return (
    <div>

    <Header />
      {activeItem == "incoming" ? (
        <IncomingOrders />
      ) : ( <CurrentOrders /> ) }

      <Menu fixed="bottom" tabular>
        <Menu.Item
          name="incoming"
          active={activeItem === "incoming"}
          onClick={handleItemClick}
        >
          Incoming Orders
        </Menu.Item>

        <Menu.Item
          name="current"
          active={activeItem === "current"}
          onClick={handleItemClick}
        >
          Current Orders
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Driver;
