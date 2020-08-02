import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import DetailsModal from "./TrackOrderModal";
import { useTranslation } from "react-i18next";
import "./CurrentOrders.css";
import { Button } from "semantic-ui-react";

const CurrentOrders = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="card" style={{ marginLeft: "4px", marginRight: "4px" }}>
        <div
          className="card-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>ORD0001</span>
          <span>01-08-2020</span>
        </div>
        <div className="card-content">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "15px"
            }}
          >
            <p className="p-name">Test product</p>
            <p className="p-status">Dispatched</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <p className="p-price">
              <FontAwesomeIcon icon={faRupeeSign} />
              720.00
            </p>
            <p className="p-quantity">6 kg</p>
          </div>
          <DetailsModal />
        </div>
      </div>
    </div>
  );
};

export default CurrentOrders;
