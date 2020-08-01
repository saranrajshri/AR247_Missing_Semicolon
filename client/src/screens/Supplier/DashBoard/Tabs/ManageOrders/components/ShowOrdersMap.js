import React, { useContext } from "react";
import { Context } from "../../../../../../Context/Context";

const ShowOrdersMap = () => {
  const { liveUpdates } = useContext(Context);
  var strJSON = JSON.stringify(liveUpdates.markers);
  strJSON = encodeURIComponent(JSON.stringify(liveUpdates.markers));
  return (
    <div>
      <iframe
        scrolling="no"
        title="Show Orders"
        src={`/maps/ShowOrders.html?markers=${strJSON}`}
        style={{
          width: "100%",
          height: 470,
          border: "none"
        }}
      />
    </div>
  );
};
export default ShowOrdersMap;
