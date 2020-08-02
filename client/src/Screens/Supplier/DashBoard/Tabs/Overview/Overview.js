import React from "react";

const Overview = () => {
  var vehicleCat = [
    {
      text: "All Order Count",
      quanity: 5,
      classColor: "text-orange",
      color: "#FFA700"
    },
    {
      text: "Positive",
      quanity: 2,
      classColor: "text-green",
      color: "#21b621"
    },
    {
      text: "Negative",
      quanity: 3,
      classColor: "text-red",
      color: "#ff3939"
    }
  ];
  return (
    <div className="p-5">
      <p className="title text-dark">Overview</p>
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
          <div className="table-wrapper"></div>
        </div>
        {/* Right Column */}
        <div className="grid-item">
          <div className="card">
            <div className="card-content"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;
