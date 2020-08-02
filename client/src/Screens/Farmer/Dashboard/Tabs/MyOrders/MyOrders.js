import React, { useState } from "react";
import "./MyOrders.css";
import { useHistory } from "react-router-dom";
import CurrentOrders from "./components/CurrentOrders/CurrentOrders";
import CompletedOrders from "./components/CompletedOrders/CompletedOrders";
import { Menu } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MyOrders = () => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("completedOrders");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <>
      <div id="farmer-header">
        <div className="logo-bar">
          <div className="logo-name">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="icon"
              onClick={() => history.goBack()}
            />
          </div>
        </div>
      </div>
      <Menu tabular widths="2" style={{ marginTop: "-1px" }}>
        <Menu.Item
          name="currentOrders"
          active={activeItem === "currentOrders"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="completedOrders"
          active={activeItem === "completedOrders"}
          onClick={handleItemClick}
        />
      </Menu>
      {activeItem === "currentOrders" ? <CurrentOrders /> : <CompletedOrders />}
    </>
  );
};

export default MyOrders;
