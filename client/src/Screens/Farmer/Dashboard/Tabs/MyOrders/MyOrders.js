import React, { useState } from "react";
import "./MyOrders.css";
import { useHistory } from "react-router-dom";
import CurrentOrders from "./components/CurrentOrders/CurrentOrders";
import CompletedOrders from "./components/CompletedOrders/CompletedOrders";
import { Menu } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("currentOrders");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const { t, i18n } = useTranslation();
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
          name={t("currentOrders")}
          active={activeItem === t("currentOrders")}
          onClick={handleItemClick}
        />
        <Menu.Item
          name={t("completedOrders")}
          active={activeItem === t("completedOrders")}
          onClick={handleItemClick}
        />
      </Menu>
      {activeItem === t("currentOrders") ? (
        <CurrentOrders />
      ) : (
        <CompletedOrders />
      )}
    </>
  );
};

export default MyOrders;
