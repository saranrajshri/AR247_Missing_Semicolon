import React from "react";

/**
 * Map Component to track order.
 * @params {Array} pickUpCoordinates
 * @params {Array} dropCoordaintes
 */
const TrackOrderMap = (props) => {
  const { pickUpCoordinates, dropCoordinates, currentCoordinates } = props;
  return (
    <div>
      <iframe
        scrolling="no"
        title="Show Route"
        src={`/maps/TrackOrder.html?originLat=${pickUpCoordinates[0]}&originLon=${pickUpCoordinates[1]}&destinationLat=${dropCoordinates[0]}&destinationLon=${dropCoordinates[1]}&currentLat=${currentCoordinates[0]}&currentLon=${currentCoordinates[1]}`}
        style={{
          width: "100%",
          height: 500,
          border: "none"
        }}
      />
    </div>
  );
};
export default TrackOrderMap;
