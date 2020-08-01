import React, { useState, useContext } from "react";

import { Form, Input, Label, Search, Button } from "semantic-ui-react";
import { Context } from "../../../../../Context/Context";

import { dispatchOrder } from "../../../../../actions/actions";

const AssignDrivers = () => {
  const [driverPrice, setDriverPrice] = useState("");
  const [isSuggestionBoxOpen, setSuggestionBoxOpen] = useState(false);
  const {
    drivers,
    supplierData,
    setFullScreenLoader,
    setAlert,
    setSelectedComponent,
    orderToBeDispatched,
  } = useContext(Context);
  const [tripDetails, setTripDetails] = useState(orderToBeDispatched);
  const [searchValue, setSearchValue] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [isModalOpen, setModal] = useState(false);
  const [driverDetails, setDriverDetails] = useState({});

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      setSuggestionBoxOpen(true);
      filterDrivers();
    } else {
      setSuggestionBoxOpen(false);
      setFilteredDrivers([]);
    }
  };

  // Filter driver by  names
  const filterDrivers = () => {
    let filterDrivers = drivers.filter((driver) =>
      driver.driverName.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Change the structure according to the search suggestion list
    let newFilteredDrivers = [];
    filterDrivers.map((driver) => {
      driver.title = driver.driverName;
      driver.description = driver.vehicleType;
      driver.image =
        "https://www.kindpng.com/picc/m/72-723761_student-png-sammilani-mahavidyalaya-undergraduate-and-dummy-user.png";
      newFilteredDrivers.push(driver);
      return null;
    });
    setFilteredDrivers(newFilteredDrivers);
  };

  const handleChange = (e) => {
    setDriverPrice(e.target.value);
  };


  // update the driver data to the state
  const handleSelect = (e, { result }) => {
    var tempTripDetails = tripDetails;
    tempTripDetails.driverID = result.driverID;
    setTripDetails(tempTripDetails);
    setDriverDetails(result);
    setSuggestionBoxOpen(false);
    setSearchValue(result.title);
  };

  // dispatch order
  const handleSubmit = () => {
    var tempState = tripDetails;
    tempState.orderData.driverPrice = parseInt(driverPrice);
    var dataToBeSent = {
      driverID: tempState.driverID,
      orderData: tempState.orderData,
    };
    setFullScreenLoader(true);
    dispatchOrder(tempState.orderID, dataToBeSent, supplierData._id).then(
      (res) => {
        if (res.status === 200) {
          setFullScreenLoader(false);
          setAlert({
            isOpen: true,
            message: "Order Dispatched Successfully",
            alertType: "positive",
          });
          setSelectedComponent("IncomingOrders"); // Redirect to another component
        } else {
          setFullScreenLoader(false);
          setAlert({
            isOpen: true,
            message: "Failed to Dispatch Order",
            alertType: "negative",
          });
        }
      }
    );
  };

  return (
    <div className="p-5">
      <div className="grid-container">
        <div className="grid-item">
          <p className="title text-dark">Manual Order Dispatch</p>
        </div>
        <div className="grid-item">
          <div id="float-right">
            <Button
              icon="marker"
              content="Add Checkpoints"
              color="blue"
              onClick={() => setModal(true)}
            />
            <Button
              icon="truck"
              onClick={handleSubmit}
              content="Dispatch"
              color="green"
              disabled={
                tripDetails.orderData.driverPrice !== "" &&
                tripDetails.driverID !== "" &&
                tripDetails.driverID !== undefined
                  ? false
                  : true
              }
            />
          </div>
        </div>
      </div>
      {/* Row */}
      <div className="grid-container" style={{ marginTop: 15 }}>
        {/* Left Column */}
        <div className="grid-item">
          <div className="card">
            <div className="card-content">
              <Form>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Customer Name"
                    value={tripDetails.customerData.customerName}
                    placeholder="Customer Name"
                    readOnly
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="PickUp Location"
                    value={tripDetails.tripData.pickUpLocationName}
                    placeholder="PickUp Location"
                    readOnly
                  />
                  <Form.Field
                    control={Input}
                    label="Drop Location"
                    value={tripDetails.tripData.dropLocationName}
                    placeholder="Drop Location"
                    readOnly
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Distance"
                    value={tripDetails.tripData.distance}
                    placeholder="Distance"
                    readOnly
                  />
                  <Form.Field
                    control={Input}
                    label="Estimated Time"
                    value={tripDetails.tripData.baseTime}
                    placeholder="Estimated Time"
                    readOnly
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Order Price (Customer)"
                    value={tripDetails.orderData.orderPrice}
                    placeholder="Order Price"
                    readOnly
                  />
                  <Form.Field
                    control={Input}
                    label="Payment for Driver"
                    value={driverPrice}
                    required
                    name="driverPrice"
                    onChange={handleChange}
                    placeholder="Payment for Driver"
                  />
                </Form.Group>
                {tripDetails.tripData.labels.slice(0, 5).map((label, index) => {
                  return (
                    <Label as="a" color="teal" key={index}>
                      {label}
                    </Label>
                  );
                })}
              </Form>
            </div>
          </div>

          {/* Assign Driver */}
          <div className="card" style={{ marginTop: 15 }}>
            <div className="card-content">
              <Search
                onResultSelect={handleSelect}
                onSearchChange={handleSearchChange}
                open={isSuggestionBoxOpen}
                results={filteredDrivers.slice(0, 4)}
                id="full-width-searchbar"
                placeholder="Search Drivers Here"
                value={searchValue}
                minCharacters="2"
              />

              {/* Driver Details */}
              {driverDetails.driverID !== undefined ? (
                <div style={{ marginTop: 10 }}>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field
                        control={Input}
                        label="Driver Name"
                        value={driverDetails.driverName}
                        placeholder="Customer Name"
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Field
                        control={Input}
                        label="Vehcile Number"
                        value={driverDetails.vehicleNumber}
                        placeholder="Vechile Number"
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/*TODO Right Column */}
        
      </div>

      {/* TODO Add Checkpoints Modal */}
     
    </div>
  );
};
export default AssignDrivers;
