import React, { useContext } from "react";
import "./ManageOrders.css";
import { Context } from "../../../../../Context/Context";
import OrdersTable from "./components/OrdersTable";
import ShowOrdersMap from "./components/ShowOrdersMap";

const ManageOrders = () => {
  const { liveUpdates, drivers, orders } = useContext(Context);

  var vehicleCat = [
    {
      text: "All vehicles",
      quanity: liveUpdates.allVehicles,
      classColor: "text-orange",
      color: "#FFA700"
    },
    {
      text: "On move",
      quanity: liveUpdates.onMove,
      classColor: "text-green",
      color: "#21b621"
    },
    {
      text: "Stopped",
      quanity: 0,
      classColor: "text-red",
      color: "#ff3939"
    }
  ];

  return (
    <div className="p-5">
      <p className="title text-dark">Manage Orders</p>
      {/* Row */}
      <div className="grid-container">
        {/* Left Column */}
        <div className="grid-item">
          <div className="card">
            <div className="card-content flex-row">
              {vehicleCat.map(cat => (
                <div className="card card-border-shadow block-card">
                  <div className="card-content">
                    <div className="justify-center">
                      <div
                        className="number-box"
                        style={{ backgroundColor: cat.color }}
                      >
                        <p className="box-number">{cat.quanity}</p>
                      </div>
                    </div>
                    <p className={cat.classColor}>{cat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="table-wrapper">
            <OrdersTable orders={orders} drivers={drivers} />
          </div>
        </div>
        {/* Right Column */}
        <div className="grid-item">
          <div className="card">
            <div className="card-content">
              <ShowOrdersMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
