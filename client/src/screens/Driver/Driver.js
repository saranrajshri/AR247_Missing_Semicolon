import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import IncomingOrders from "./Tabs/IncomingOrders";
import CurrentOrders from "./Tabs/CurrentOrders";
import FinishedOrders from "./Tabs/FinishedOrders";

const Driver = () => {
  const [activeItem, setactiveItem] = useState("incoming");
  const handleItemClick = (e, { name }) => setactiveItem(name);
  return (
    <div>

      {activeItem == "incoming" ? (
        <IncomingOrders />
      ) : activeItem == "current" ? (
        <CurrentOrders />
      ) : activeItem == "finished" ? (
        <FinishedOrders />
      ) : (
        ""
      )}

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

        <Menu.Item
          name="finished"
          active={activeItem === "finished"}
          onClick={handleItemClick}
        >
          Finished Orders
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Driver;
