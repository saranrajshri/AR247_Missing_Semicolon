import React from "react";

/**
 * Map Component to show the route
 * @params {Array} pickUpCoordinates
 * @params {Array} dropCoordaintes
 */
const ShowRouteMap = props => {
  const { pickUpCoordinates, dropCoordinates } = props;
  return (
    <div>
      <iframe
        scrolling="no"
        title="Show Route"
        src={`/maps/ShowRoute.html?originLat=${pickUpCoordinates.lat}&originLon=${pickUpCoordinates.lon}&destinationLat=${dropCoordinates[0]}&destinationLon=${dropCoordinates[1]}`}
        style={{
          width: "100%",
          height: 470,
          border: "none"
        }}
      />
    </div>
  );
};
export default ShowRouteMap;
