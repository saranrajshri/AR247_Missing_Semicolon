import axios from "axios";

// Constants
import constants from "../Constants/constants";

// Maps API Routes

/**
 * Get suggestions for a place name
 * @param {String} query
 * @returns {Object} data
 */
export const getPlacesSuggestions = async (query) => {
  // replace empty space with %20
  query = query.replace(" ", "%20");
  const result = await axios.get(
    `https://places.ls.hereapi.com/places/v1/suggest?at=52.5159%2C13.3777&q=${query}&apiKey=${constants.HERE_MAPS_API_KEY}`
  );

  var suggestions = await result.data.suggestions;
  var data = { status: true, data: suggestions };
  return data;
};

/**
 * Get The Latitude and Longitude For a place name
 * @param {String} placeName
 * @returns {Object} result
 */
export const geoCoder = async (placeName) => {
  placeName = placeName.replace(" ", "%20");
  const res = await axios.get(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=${placeName}&gen=9&apiKey=${constants.HERE_MAPS_API_KEY}`
  );

  var coordinates = await res.data.Response.View[0].Result[0].Location
    .DisplayPosition;
  var result = {
    status: true,
    data: {
      lat: coordinates.Latitude,
      lon: coordinates.Longitude,
    },
  };
  return result;
};

/**
 * Get the trip details such as Distance, time, road conditions
 * @param {Object} data
 * @returns {Object} result
 */
export const calculateTripDetails = async (data) => {
  const res = await axios.get(
    `https://fleet.api.here.com/2/calculateroute.json?&waypoint0=geo!${data.fromCoordinates.lat},${data.fromCoordinates.lon}&waypoint1=geo!${data.toCoordinates.lat},${data.toCoordinates.lon}&currency=INR&tollVehicleType=3&mode=fastest;truck;traffic:enabled&rollup=none,country;tollsys&app_id=${constants.HERE_MAPS_APP_ID}&app_code=${constants.HERE_MAPS_APP_CODE}&driver_cost=${data.driverCost}&vechile_cost=${data.vechileCost}`
  );
  var result = {
    summary: res.data.response.route[0].summary,
    cost: res.data.response.route[0].cost,
  };
  return result;
};
