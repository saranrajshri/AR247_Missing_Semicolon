import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Landing from "./Screens/Landing/Landing";

import Login from "./Screens/Supplier/Login/Login";
import Signup from "./Screens/Supplier/Signup/Signup";
import Home from "./Screens/Supplier/DashBoard/Home";

import Signin from "./Screens/Farmer/Signin/Signin";
import Register from "./Screens/Farmer/Register/Register";
import FarmerHome from "./Screens/Farmer/Dashboard/FarmerHome";
import {
  ProductDescription,
  Checkout,
  CartScreen,
  MyOrders,
  OrderReceipt
} from "./Screens/Farmer/Dashboard/Tabs";

import Driver from "./Screens/Driver/Driver";
import DriverLogin from "./Screens/Driver/Login/Login";

import { FarmerContext } from "./Context/FarmerContext";
import { DriverContext } from "./Context/DriverContext";
import {
  checkCustomerAuthentication,
  checkDriverAuthentication
} from "./actions/actions";
// Route function containing all routes for the app.
const Routes = () => {
  const { setFarmerData } = useContext(FarmerContext);
  const { setDriverData } = useContext(DriverContext);

  useEffect(() => {
    const checkCustomer = () => {
      checkCustomerAuthentication()
        .then((res) => {
          // console.log(res.data);
          setFarmerData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setFarmerData({});
          localStorage.removeItem("CUSTOMER_AUTH_TOKEN");
        });
    };
    const checkDriver = () => {
      checkDriverAuthentication()
        .then((res) => {
          setDriverData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setDriverData({});
          localStorage.removeItem("DRIVER_AUTH_TOKEN");
        });
    };

    checkCustomer();
    checkDriver();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          {/* Supplier routes */}
          <Route path="/supplier/home" exact component={Home} />
          <Route path="/supplier/login" exact component={Login} />
          <Route path="/supplier/signup" exact component={Signup} />
          {/* Driver routes */}
          <PrivateRoute path="/driver/home" exact component={Driver} />
          <Route path="/driver/login" exact component={DriverLogin} />
          {/* Farmer routes */}
          <Route path="/farmer/login" exact component={Signin} />
          <Route path="/farmer/register" exact component={Register} />
          <Route path="/farmer/home" exact component={FarmerHome} />
          <Route
            path="/farmer/product/:productId"
            exact
            component={ProductDescription}
          />
          <PrivateRoute path="/farmer/checkout" exact component={Checkout} />
          <PrivateRoute path="/farmer/cart" exact component={CartScreen} />
          <PrivateRoute path="/farmer/orders" exact component={MyOrders} />
          <PrivateRoute
            path="/farmer/orders/orderReceipt"
            exact
            component={OrderReceipt}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
