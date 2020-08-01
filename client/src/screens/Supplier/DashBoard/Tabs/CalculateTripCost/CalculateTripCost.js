import React, { useState, useContext } from "react";

// Semantic UI Components
import { Label, Form, Divider, Button, Icon } from "semantic-ui-react";

// Stylesheet
import "./CalculateTripCost.css";

// Actions
import {
  getPlacesSuggestions,
  geoCoder,
  calculateTripDetails,
} from "../../../../../actions/mapActions";

// Context
import { Context } from "../../../../../Context/Context";

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faClock,
  faTape,
} from "@fortawesome/free-solid-svg-icons";

const CalculateTripCost = () => {
  const [data, setData] = useState({ driverCost: 0, vechileCost: 0 });
  const [fromSuggestionBoxIsOpen, setFromSuggestionBox] = useState(false);
  const [toSuggestionBoxIsOpen, setToSuggestionBox] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromLocationName, setFromLocationName] = useState("");
  const [toLocationName, setToLocationName] = useState("");
  const [fromLocationGeoAddress, setFromLocationGeoAddress] = useState({});
  const [toLocationGeoAddress, setToLocationGeoAddress] = useState({});
  const [tripDetails, setTripDetails] = useState({});
  const { setFullScreenLoader } = useContext(Context);

 
  return (
    <div className="p-5">
      <div className="title text-dark">Calculate Trip Cost</div>
      <div style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card-content">
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  name="driverCost"
                  required
                  label="Driver Cost (per Hour)"
                  onChange={handleChange}
                  placeholder="Driver Cost"
                />
                <Form.Input
                  fluid
                  name="vechileCost"
                  required
                  label="Vechile Cost (per Hour)"
                  onChange={handleChange}
                  placeholder="Vechile Cost"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  name="from"
                  value={fromLocationName}
                  label="Pick Up Location"
                  onChange={handleFromLocationChange}
                  placeholder="Pick Up Location"
                  icon={<Icon name="search" inverted circular link />}
                />
                <Form.Input
                  fluid
                  required
                  name="to"
                  value={toLocationName}
                  label="Drop Location"
                  onChange={handleToLocationChange}
                  placeholder="Drop Location"
                  icon={<Icon name="search" inverted circular link />}
                />
              </Form.Group>
            </Form>

            {/* Suggestion Box */}
            <div className="grid-container">
              <div className="grid-item">
                {fromSuggestionBoxIsOpen ? (
                  <div className="suggestion-box">
                    {fromSuggestions.slice(0, 6).map((suggestion, index) => {
                      return (
                        <div
                          className="suggestion-tile"
                          onClick={() => getCoordinates(suggestion, "from")}
                          key={index}
                        >
                          {suggestion}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="grid-item">
                {toSuggestionBoxIsOpen ? (
                  <div className="suggestion-box">
                    {toSuggestions.slice(0, 6).map((suggestion, index) => {
                      return (
                        <div
                          className="suggestion-tile"
                          onClick={() => getCoordinates(suggestion, "to")}
                          key={index}
                        >
                          {suggestion}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            <Divider />
            <Button>Clear</Button>
            <Button primary onClick={submit}>
              Calculate
            </Button>
          </div>
        </div>

        {/* Trip Details */}
        {tripDetails.summary !== undefined ? (
          <div className="card" style={{ marginTop: 20 }}>
            <div className="card-header">Trip Details</div>
            <div className="card-content">
              <div className="grid-container">
                <div className="grid-item">
                  <p className="bold-text">
                    Driver Cost :
                    <FontAwesomeIcon
                      icon={faRupeeSign}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <b>{tripDetails.cost.details.driverCost}</b>
                  </p>
                  <p className="bold-text">
                    Vehicle Cost :
                    <FontAwesomeIcon
                      icon={faRupeeSign}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <b>{tripDetails.cost.details.vehicleCost}</b>
                  </p>
                  <p className="bold-text">
                    Toll Cost :
                    <FontAwesomeIcon
                      icon={faRupeeSign}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <b>{tripDetails.cost.details.tollCost}</b>
                  </p>
                  <p className="bold-text">
                    Total Cost :
                    <FontAwesomeIcon
                      icon={faRupeeSign}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <b>{tripDetails.cost.totalCost}</b>
                  </p>
                  <p className="bold-text">Road Details :</p>
                  {tripDetails.summary.flags.map((flag, index) => {
                    return (
                      <Label
                        as="a"
                        color="red"
                        key={index}
                        style={{ marginRight: 10 }}
                      >
                        {flag}
                      </Label>
                    );
                  })}
                </div>
                <div className="grid-item">
                  <p className="bold-text">
                    Base Time :
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <b>
                      {(tripDetails.summary.baseTime / 3600).toFixed(2) +
                        " HRS"}
                    </b>
                  </p>
                  <p className="bold-text">
                    Distance:
                    <FontAwesomeIcon
                      icon={faTape}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <b>
                      {(tripDetails.summary.distance / 1000).toFixed(2) + " KM"}
                    </b>
                  </p>
                  <p className="bold-text">
                    Traffic Time :
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <b>
                      {(tripDetails.summary.trafficTime / 3600).toFixed(2) +
                        " HRS"}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default CalculateTripCost;
