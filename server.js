const express = require("express");
const app = express();
const server = require("http").createServer(app);
var io = require("socket.io")(server);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/database.json")[
  process.env.NODE_ENV || "development"
];
const path = require("path");
const morgan = require("morgan");

const routes = require("./routes/index");

// Socket io
io.on("connection", client => {
  console.log("Client Connected");
  app.set("client", client);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// log only for 4xx and 5xx errors
app.use(
  morgan("dev", {
    skip: function(req, res) {
      var result = {};
      result.body = req.body;
      result.params = req.params;
      console.log(result);
      return res.statusCode < 400;
    }
  })
);

// routes
app.use("/api/v3", routes);
const port = process.env.PORT || 8000;

// Mongodb
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("MongoDB Connection Error");
  });

// Error Handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message
    }
  });
});

// heroku deployement
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(_req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
