import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FarmerContext } from "./Context/FarmerContext";
import { DriverContext } from "./Context/DriverContext";

// Route function containing all routes for the app.
const Routes = () => {
  const { setFarmerData } = useContext(FarmerContext);
  const { setDriverData } = useContext(DriverContext);

  return (
    <div>
      <Router>
        <Switch>
          {/* TO DO */}

          {/* <Route path="/" exact component={Landing} /> */}
          {/* Supplier routes */}
          {/* <Route path="/supplier/home" exact component={Home} />
          <Route path="/supplier/login" exact component={Login} />
          <Route path="/supplier/signup" exact component={Signup} /> */}
          {/* Driver routes */}
          {/* <PrivateRoute path="/driver/home" exact component={Driver} />
          <Route path="/driver/login" exact component={DriverLogin} /> */}
          {/* Farmer routes */}

          {/* <Route path="/farmer/login" exact component={Signin} />
          <Route path="/farmer/register" exact component={Register} />
          <Route path="/farmer/home" exact component={FarmerHome} />
          <Route
            path="/farmer/product/:productId"
            exact
            component={ProductDescription}
          /> */}
          {/* <PrivateRoute path="/farmer/checkout" exact component={Checkout} /> */}
          {/* <PrivateRoute path="/farmer/cart" exact component={CartScreen} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
