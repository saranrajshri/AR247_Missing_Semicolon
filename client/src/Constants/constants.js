const prod = {
  BASE_URL: "https://mrjutedev.herokuapp.com/api/v3",
  SOCKET_ENDPOINT: "https://mrjutedev.herokuapp.com",
  HERE_MAPS_API_KEY: "Omfb3D_6gnrF9h7r_TsQAyFJrj47fZcbqIeN41Uxxxw",
  HERE_MAPS_APP_ID: "xPIcFc8xn5PLiheKwn5p",
  HERE_MAPS_APP_CODE: "8f8NlzUfaHYVJuitDFoDgA"
};
const dev = {
  BASE_URL: "http://localhost:8000/api/v3",
  SOCKET_ENDPOINT: "http://localhost:8000",
  HERE_MAPS_API_KEY: "Omfb3D_6gnrF9h7r_TsQAyFJrj47fZcbqIeN41Uxxxw",
  HERE_MAPS_APP_ID: "xPIcFc8xn5PLiheKwn5p",
  HERE_MAPS_APP_CODE: "8f8NlzUfaHYVJuitDFoDgA"
};

export default process.env.NODE_ENV === "development" ? dev : prod;
