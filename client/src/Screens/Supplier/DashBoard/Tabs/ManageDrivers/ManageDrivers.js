import React, { useState, useContext } from "react";
import "./ManageDrivers.css";
import { Search, Button } from "semantic-ui-react";
import DriversTable from "./components/DriversTable";
import AddDriverModal from "./components/AddDriverModal";
import { Context } from "../../../../../Context/Context";
import { deleteDriver, addDriver } from "../../../../../actions/actions";

const ManageDrivers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const { drivers, setFullScreenLoader, setAlert, supplierData } = useContext(
    Context
  );
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      filterDrivers(e.target.value);
    } else {
      setFilteredDrivers([]);
    }
  };
  // Filter products by product names
  const filterDrivers = (value) => {
    let filteredDrivers = drivers.filter((driver) =>
      driver.driverName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDrivers(filteredDrivers);
  };

  const handleDeleteDriver = (driverID) => {
    setFullScreenLoader(true);
    deleteDriver(driverID, supplierData._id).then((res) => {
      if (res.status === 200) {
        setFullScreenLoader(false);
        setAlert({
          alertType: "positive",
          message: "Driver Deleted Successfully",
          isOpen: true,
        });
      } else {
        setFullScreenLoader(false);
        setAlert({
          alertType: "negative",
          message: "Failed to delete driver",
          isOpen: true,
        });
      }
    });
  };

  const handleAddDriver = (driverData) => {
    setFullScreenLoader(true);
    addDriver(driverData).then((res) => {
      if (res.status === 200) {
        setFullScreenLoader(false);
        setAlert({
          alertType: "positive",
          message: "Driver added successfully",
          isOpen: true,
        });
      } else {
        setFullScreenLoader(false);
        setAlert({
          alertType: "negative",
          message: "Failed to add driver",
          isOpen: true,
        });
      }
    });
  };

  return (
    <div className="p-5">
      <p className="title text-dark">Manage Drivers</p>
      {/* Search bar */}
      <div className="search-add-bar">
        <div className="search-bar">
          <Search
            onSearchChange={handleSearchChange}
            open={false}
            placeholder="Search here"
            value={searchValue}
            minCharacters="2"
          />
        </div>
        <div>
          <Button
            icon="plus"
            content="Add driver"
            color="blue"
            onClick={() => setAddModal(true)}
          />
        </div>
      </div>
      {/* Drivers table */}
      <div className="table-wrapper">
        {filteredDrivers.length === 0 ? (
          <DriversTable
            drivers={drivers}
            handleDelete={(driverID) => {
              handleDeleteDriver(driverID);
            }}
          />
        ) : (
          <DriversTable
            drivers={filteredDrivers}
            handleDelete={(driverID) => {
              handleDeleteDriver(driverID);
            }}
          />
        )}
      </div>
      {/* Add driver modal */}
      <div>
        <AddDriverModal
          visible={addModal}
          data={supplierData}
          handleClose={() => setAddModal(false)}
          handleDone={handleAddDriver}
        />
      </div>
    </div>
  );
};

export default ManageDrivers;
