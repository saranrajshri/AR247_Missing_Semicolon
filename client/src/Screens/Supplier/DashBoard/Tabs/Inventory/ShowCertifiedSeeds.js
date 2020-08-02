import React from "react";
import CertifiedSeedsTable from "./CertifiedSeedsTable";

const ShowCertifiedSeeds = () => {
  return (
    <div className="p-5">
      <p className="title text-dark">Show Certified Seeds</p>
      <div className="table-wrapper">
        <CertifiedSeedsTable
          certifiedSeeds={drivers}
          handleDelete={seedsID => {
            // handleDeleteDriver(seedsID);
            alert(seedsID);
          }}
        />
      </div>
    </div>
  );
};
export default ShowCertifiedSeeds;

const drivers = [
  {
    _id: 6576585858858,
    seedsID: "BSC0001",
    producerName: "Raj",
    contact: "1234567890",
    address: "76, car park",
    expiryDate: "23-2-2001",
    quantity: "25kg"
  },
  {
    seedsID: "BSC0001",
    producerName: "Raj",
    contact: "1234567890",
    address: "76, car park",
    expiryDate: "23-2-2001",
    quantity: "25kg",
    _id: 65765858588788
  }
];
