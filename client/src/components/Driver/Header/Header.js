import React, { useContext } from "react";

// Stylesheet
import "./Header.css";

import { Helmet } from "react-helmet";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../Context/Context";
import { DriverContext } from "../../../Context/DriverContext";

const Header = () => {
  const { selectedComponent } = useContext(DriverContext);
  return (
    <div className="">
      {/* React Helmet (for the changing the page title dynamically)*/}
      <Helmet>
        <title>{selectedComponent + " - Mr.Jute"}</title>
      </Helmet>
      <div className="header-content-wrapper">
        <button className="hamburger-btn">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="faded-text">Mr. Jute - Driver Dashboard</span>
      </div>
    </div>
  );
};
export default Header;
