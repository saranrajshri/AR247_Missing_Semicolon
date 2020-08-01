import React from "react";
import "./Landing.css";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faHandPointDown } from "@fortawesome/free-solid-svg-icons";
/**
 * Landing page.
 */
const Landing = () => {
  const history = useHistory();
  return (
    <div className="full-container landing">
      <nav>
        <ul>
          <li>
            <p className="logo-name">mr.jute</p>
          </li>
          <li className="right-link">
            <p>Contact</p>
          </li>
          <li className="right-link">
            <p>About us</p>
          </li>
        </ul>
      </nav>
      <div className="top-page">
        <div className="header-content">
          <p className="header-text">
            Buy and sell certified jute seeds across the country.
          </p>
          <p className="header-sub-text">One place for everything.</p>
          <p className="header-secondary-text">
            Let's get started. <span>Login to your portal</span>
            <FontAwesomeIcon icon={faHandPointDown} className="hand-icon" />
          </p>
        </div>
        <div className="header-content">
          <FontAwesomeIcon icon={faLeaf} className="leaf-icon" />
        </div>
      </div>
      <div className="bottom-page">
        <div className="card">
          <div className="card-header">Customer portal</div>
          <div className="card-content">
            Buy new certified jute seeds from suppliers across the counry.
          </div>
          <div className="card-footer">
            <Button
              fluid
              content="GO"
              icon="sign-in"
              iconPosition="right"
              className="go-button"
              onClick={() => history.push("/farmer/home")}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-header">Supplier portal</div>
          <div className="card-content">
            Sell the jute seeds and manage drivers all in one place.
          </div>
          <div className="card-footer">
            <Button
              fluid
              content="GO"
              icon="sign-in"
              iconPosition="right"
              className="go-button"
              onClick={() => history.push("/supplier/login")}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-header">Driver portal</div>
          <div className="card-content">
            Register with a supplier with your vehicle and supply across the
            counry.
          </div>
          <div className="card-footer">
            <Button
              fluid
              content="GO"
              icon="sign-in"
              className="go-button"
              onClick={() => history.push("/driver/home")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
