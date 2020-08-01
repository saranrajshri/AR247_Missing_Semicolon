import React, { useContext } from "react";

// Stylesheet
import "./Header.css";

import { Helmet } from "react-helmet";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../Context/Context";

const Header = () => {
  const { selectedComponent } = useContext(Context);
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
      </div>
    </div>
  );
};
export default Header;
