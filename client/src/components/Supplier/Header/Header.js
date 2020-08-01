import React, { useContext } from "react";

// Stylesheet
import "./Header.css";

import { Helmet } from "react-helmet";

import { Icon, Label } from "semantic-ui-react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../Context/Context";

const Header = () => {
  const { selectedComponent, notifications } = useContext(Context);
  return (
    <div className="header">
      {/* React Helmet (for the changing the page title dynamically)*/}
      <Helmet>
        <title>{selectedComponent + " - Mr.Jute"}</title>
      </Helmet>
      <div className="header-content-wrapper">
        <button className="hamburger-btn">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="faded-text">Mr. Jute - Supplier Dashboard</span>
        <Label
          style={{ marginLeft: 20 }}
          color="yellow"
          className="cursor-pointer"
        >
          <Icon name="mail" /> {notifications.length}
        </Label>{" "}
      </div>
    </div>
  );
};
export default Header;
