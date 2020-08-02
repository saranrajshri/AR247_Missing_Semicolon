const Order = require("../../models/OrdersSchema");
const Driver = require("../../models/DriversSchema");
const Supplier = require("../../models/SupplierSchema");
const axios = require("axios");
const createError = require("http-errors");
const config = require("../../config/database.json")[
  process.env.NODE_ENV || "development"
];
let order = (module.exports = {});

// get trip details
/**
 * Get the trip details such as Distance, time, road conditions
 * @param {Object} data
 * @returns {Object} Response Object
 */
const calculateTripDetails = async data => {
  const res = await axios.get(
    `https://fleet.api.here.com/2/calculateroute.json?&waypoint0=geo!${data.fromCoordinates.lat},${data.fromCoordinates.lon}&waypoint1=geo!${data.toCoordinates.lat},${data.toCoordinates.lon}&currency=INR&tollVehicleType=3&mode=fastest;truck;traffic:enabled&rollup=none,country;tollsys&app_id=${config.HERE_MAPS_APP_ID}&app_code=${config.HERE_MAPS_APP_CODE}`
  );
  var result = {
    summary: res.data.response.route[0].summary,
    cost: res.data.response.route[0].cost
  };
  return result;
};

/**
 * Get the address (name) of the place
 * @param {Array} coordinates
 * @returns {Object} Response Object
 */
const reverseGeoCoder = async coordinates => {
  const res = await axios.get(
    `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${coordinates[0]}%2C${coordinates[1]}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=${config.HERE_MAPS_API_KEY}`
  );
  const address = res.data.Response.View[0]["Result"][0]["Location"]["Address"];
  return address;
};

const fetchOrdersOfASupplier = (req, supplierID) => {
  // var client = req.app.get("client");
  // Order.find({ supplierID: supplierID })
  //   .sort({ orderID: -1 })
  //   .then(orders => {
  //     client.emit("orders", orders);
  //   })
  //   .catch(() => {
  //     client.emit("orders", []);
  //   });
};

const sendSMS = message => {
  const client = require("twilio")(
    "AC987642e062b8abd817200b4f5021148c",
    "749e71e33617dccde9cb37688e3ac9ea"
  );
  client.messages
    .create({
      from: "+12029335106",
      to: "+919500149967",
      body: message
    })
    .then(messsage => console.log(message.sid));
};

const fetchLiveUpdates = async (req, supplierID) => {
  var client = req.app.get("client");
  try {
    const totalNumberOfCurrentOrders = await Order.find({
      supplierID: req.params.supplierID,
      isOrderAssigned: true,
      isOrderDelivered: false
    }).count();

    const totalNumberOfMovingVechiles = await Order.find({
      supplierID: req.params.supplierID,
      isOrderDelivered: false,
      "currentStatus.status": "onMove"
    }).count();

    const markers = await Order.find({
      supplierID: req.params.supplierID,
      isOrderDelivered: false,
      "currentStatus.status": "onMove"
    });
    var arrayOfMarkes = [];

    markers.map(marker => {
      var dataToBePushed = {};
      if (
        marker.currentStatus !== undefined &&
        marker.currentStatus.coordinates !== undefined
      ) {
        dataToBePushed.coordinates = {
          lat: marker.currentStatus.coordinates.lat,
          lng: marker.currentStatus.coordinates.lon
        };
        dataToBePushed.details = {
          orderID: marker.orderID,
          fromLocationName: marker.tripData.pickUpLocationName,
          toLocationName: marker.tripData.dropLocationName
        };
        arrayOfMarkes.push(dataToBePushed);
      }
    });

    var results = {
      allVehicles: totalNumberOfCurrentOrders,
      onMove: totalNumberOfMovingVechiles,
      markers: arrayOfMarkes
    };

    client.emit("liveUpdates", results);
  } catch {
    client.emit("liveUpdates", { allVehicles: 0, onMove: 0 });
  }
};

// Function to place order
const placeOrder = async (req, res, orderData) => {
  var newOrder = new Order(orderData);
  // Get the supplier pickup location
  Supplier.findOne({ _id: orderData.supplierID })
    .then(async supplier => {
      // Adds Trip data
      const dataToBeSent = {
        fromCoordinates: {
          lat: supplier.wareHouse.coordinates.lat,
          lon: supplier.wareHouse.coordinates.lon
        },
        toCoordinates: {
          lat: orderData.dropCoordinates[0],
          lon: orderData.dropCoordinates[1]
        }
      };
      const tripDetailsAndCost = calculateTripDetails(dataToBeSent);
      const dropAddress = await reverseGeoCoder(orderData.dropCoordinates);
      tripDetailsAndCost
        .then(trip => {
          newOrder.tripData = {
            pickUpLocationName: supplier.wareHouse.locationName,
            dropLocationName: dropAddress.Label,
            pickUpCoordinates: supplier.wareHouse.coordinates,
            dropCoordinates: orderData.dropCoordinates,
            distance: trip.summary.distance,
            baseTime: trip.summary.baseTime,
            checkpoints: [],
            labels: trip.summary.flags
          };
          newOrder
            .save()
            .then(response => {
              fetchOrdersOfASupplier(req, orderData.supplierID); // emit new changes through socket
              fetchLiveUpdates(req, req.params.supplierID);

              res.status(200).send(response);
              sendSMS("Your Order Has been placed successfully");
            })
            .catch(() => {
              res.send(err);

              res.status(400).send({ message: "Failed to place order" });
            });
        })
        .catch(err => {
          res.send(err);
          // res.status(400).send({ message: "Failed to place order" });
        });
    })
    .catch(err => {
      res.send(err);
      // res.status(400).send({ message: "Failed to place order" });
    });
};

// Add a new order
order.add = async (req, res) => {
  const { orderData } = req.body;

  // Separate the data according to their suppliers
  var data = [];
  var productsHashmap = {};
  orderData.products.map(product => {
    if (productsHashmap.hasOwnProperty(product.supplierID)) {
      productsHashmap[product.supplierID].push(product);
    } else {
      productsHashmap[product.supplierID] = [product];
    }
  });
  const { customerData, dropCoordinates } = req.body;
  Object.keys(productsHashmap).map(async supplierProducts => {
    var dummyData = {};
    dummyData.orderData = {};
    dummyData.customerData = customerData;
    dummyData.dropCoordinates = dropCoordinates;
    dummyData.orderData.products = productsHashmap[supplierProducts];
    var orderPrice = 0;
    dummyData.supplierID = supplierProducts;
    dummyData.orderData.products.map(product => {
      orderPrice += product.quantity * product.productPrice;
    });
    dummyData.orderData.orderPrice = orderPrice;

    data.push(dummyData);
  });

  var ordersCount = await Order.find({}).count({});
  data.map(eachOrderData => {
    eachOrderData.orderID = "OR-" + parseInt(ordersCount + 2);
    ordersCount++;
    placeOrder(req, res, eachOrderData);
  });

  // res.send({ message: "Order Placed Successfully" });
};

// get orders of a supplier
order.getOrdersOfASupplier = (req, res) => {
  Order.find({ supplierID: req.params.supplierID })
    .sort({ orderID: -1 })
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      res.send(err);
    });
  // fetchOrdersOfASupplier(req, req.params.supplierID);
};

// dispatch a order
order.dispatch = (req, res) => {
  var orderData = req.body;
  Order.findOneAndUpdate(
    { orderID: req.params.orderID },
    {
      isOrderAssigned: true,
      driverID: orderData.driverID,
      orderData: orderData.orderData
    }
  )
    .then(() => {
      fetchOrdersOfASupplier(req, req.params.supplierID); // emit new changes through socket
      fetchLiveUpdates(req, req.params.supplierID);
      sendSMS("Your Order Has been dispatched to our delivery executive");

      res.status(200).send({ message: "Order Dispatched Successfully" });
    })
    .catch(() => {
      res.status(400).send({ message: "Failed to dispatch Order" });
    });
};

// update a order as picked
order.markAsPicked = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { isOrderAssigned: true, orderID: req.params.orderID },
      { orderPickedTime: new Date(), isOrderDispatched: true }
    );
    const driver = await Driver.findOneAndUpdate(
      { driverID: req.params.driverID },
      { isAvailable: false }
    );

    if (!order) {
      throw createError(422, "Order is not assigned");
    }
    fetchOrdersOfASupplier(req, req.params.supplierID);
    fetchLiveUpdates(req, req.params.supplierID);
    sendSMS(
      "Your Order Has been received by the driver and he has started the trip"
    );

    res.send(order);
  } catch (err) {
    next(err);
  }
};

order.markAsCompleted = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        isOrderAssigned: true,
        isOrderDispatched: true,
        orderID: req.params.orderID
      },
      { orderDeliveredTime: new Date(), isOrderDelivered: true }
    );
    if (!order) {
      throw createError(422, "Order is not assigned/ dispatched");
    }
    fetchOrdersOfASupplier(req, req.params.supplierID);
    fetchLiveUpdates(req, req.params.supplierID);
    sendSMS(
      "Your Order Has been delivered successfully. If there is any problem, contact us or report through the app"
    );

    res.send(order);
  } catch (err) {
    next(err);
  }
};

order.updateCurrentStatus = async (req, res, next) => {
  try {
    const { currentStatus } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { orderID: req.params.orderID },
      { currentStatus: currentStatus }
    );
    fetchOrdersOfASupplier(req, req.params.supplierID);
    fetchLiveUpdates(req, req.params.supplierID);

    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

order.getLiveUpdates = async (req, res, next) => {
  fetchLiveUpdates(req, req.params.supplierID);
};
